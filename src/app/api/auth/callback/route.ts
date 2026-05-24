import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { scalekit } from "@/lib/scalekit";

export async function GET(req: NextRequest) {
  try {
    // Get code from URL
    const code =
      req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code missing" },
        { status: 400 }
      );
    }

    // Redirect URL
    const redirectUrl =
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

    // OLD SDK METHOD
    const tokenResponse =
      await scalekit.authenticateWithCode(
        code,
        redirectUrl
      );

    console.log("TOKEN RESPONSE:", tokenResponse);

    // Access token
    const accessToken =
      tokenResponse.accessToken;

    // Save cookie
    const cookieStore = await cookies();

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Redirect after login
    return NextResponse.redirect(
      new URL("/", req.url)
    );

  } catch (error) {
    console.error("CALLBACK ERROR:", error);

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}