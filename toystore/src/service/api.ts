import axios, { AxiosError, AxiosInstance } from "axios";
import {
  getCookie as getClientCookie,
  setCookie as setClientCookie,
} from "cookies-next/client";

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type RegisterInterceptTokenManagerProps = {
  signOut: () => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: ({}: RegisterInterceptTokenManagerProps) => () => void;
};

let isRefreshing = false;
let failedQueue: Array<PromiseType> = [];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
}) as APIInstanceProps;

api.interceptors.request.use(async (config) => {
  try {
    const token = getClientCookie("@toystore.token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn("Erro ao buscar cookie no cliente:", error);
  }
  return config;
});
api.registerInterceptTokenManager = ({ signOut }) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        if (error.response.data.message === "jwt expired") {
          const oldToken = getClientCookie("@toystore.token");

          if (!oldToken) {
            signOut();
            return Promise.reject(error);
          }

          const originalRequest = error.config!;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequest.headers["Authorization"] = `Bearer ${token}`;
                  resolve(api(originalRequest));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const response = await api.post("/user/refresh-token", {
                oldToken,
              });

              const { token } = response.data;

              setClientCookie("@toystore.token", token, {
                maxAge: 120 * 24 * 60 * 60,
                path: "/",
              });

              originalRequest.headers["Authorization"] = `Bearer ${token}`;

              failedQueue.forEach((request) => request.onSuccess(token));

              resolve(api(originalRequest));
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
              failedQueue.forEach((request) => request.onFailure(error));

              signOut();

              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }
        signOut();
      }

      if (error.response && error.response.data) {
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api, getClientCookie };
