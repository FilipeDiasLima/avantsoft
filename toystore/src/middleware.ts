import { NextResponse, type NextRequest } from "next/server";

const unloggedRoutes = ["/", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("@toystore.token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token) {
    if (unloggedRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (unloggedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
