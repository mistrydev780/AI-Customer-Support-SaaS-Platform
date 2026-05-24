import { NextResponse } from "next/server";
import { scalekit } from "@/lib/scalekit";

export async function GET() {
  try {
    const redirectUrl =
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

    // OLD SDK METHOD
    const authUrl =
      scalekit.getAuthorizationUrl(redirectUrl);

    return NextResponse.redirect(authUrl);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}