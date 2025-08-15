"use client";

import { SignInProps } from "@/interface/sign-in";
import { UserProps } from "@/interface/user";
import { api } from "@/service/api";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextDataProps {
  user: UserProps;
  getUser: () => Promise<void>;
  signIn: (data: SignInProps) => Promise<void>;
  signUp: (data: SignInProps) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function signOut() {
  deleteCookie("@toystore.token", { path: "/" });
  window.location.href = "/";
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as UserProps);
  const [token, setToken] = useState("");

  async function signUp(data: SignInProps) {
    try {
      const response = await api.post("/auth/register", data);
      setUser(response.data.user);
      setCookie("@toystore.token", response.data.token, {
        maxAge: 120 * 24 * 60 * 60,
        path: "/",
      });
    } catch (error) {
      throw error;
    }
  }

  async function signIn(data: SignInProps) {
    try {
      const response = await api.post("/auth", data);
      setUser(response.data.user);

      setCookie("@toystore.token", response.data.token, {
        maxAge: 120 * 24 * 60 * 60,
        path: "/",
      });
    } catch (error) {
      throw error;
    }
  }

  async function getUser() {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    setToken(getCookie("@toystore.token") ?? "");
  }, []);

  useEffect(() => {
    if (token) getUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, signIn, getUser, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
