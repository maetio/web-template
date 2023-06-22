// middleware.ts
import type { NextRequest } from "next/server";
import { authentication } from "next-firebase-auth-edge/lib/next/middleware";

export async function middleware(request: NextRequest) {
  return authentication(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: "firebase-api-key",
    cookieName: "AuthToken",
    cookieSignatureKeys: ["secret1", "secret2"],
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: false, // Set this to true on HTTPS environments
      sameSite: "strict" as const,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
    },
    serviceAccount: {
      projectId: "firebase-project-id",
      privateKey: "firebase service account private key",
      clientEmail: "firebase service account client email",
    },
    // Optional
    checkRevoked: false,
    handleValidToken: async ({ token, decodedToken }) => {
      console.log("Successfully authenticated", { token, decodedToken });
      return NextResponse.next();
    },
    handleInvalidToken: async () => {
      // Avoid redirect loop
      if (request.nextUrl.pathname === "/login") {
        return NextResponse.next();
      }

      // Redirect to /login?redirect=/prev-path when request is unauthenticated
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
      return NextResponse.redirect(url);
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      // Avoid redirect loop
      if (request.nextUrl.pathname === "/login") {
        return NextResponse.next();
      }

      // Redirect to /login?redirect=/prev-path on unhandled authentication error
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
      return NextResponse.redirect(url);
    },
  });
}

export const config = {
  matcher: ["/", "/((?!_next/static|favicon.ico|logo.svg).*)"],
};