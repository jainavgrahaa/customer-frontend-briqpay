// middleware.js
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

//const DEFAULT_LOCALE_REDIRECT = "en-us";

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (!req.nextUrl.pathname.split("/home").join("") && req.nextUrl.locale === "en-default") {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  // Redirect if user loading with en-us
  // Ex. /account to /en/account
  // if (req.nextUrl.locale === DEFAULT_LOCALE_REDIRECT) {
  //     const locale = "en";

  //     return NextResponse.redirect(
  //         new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
  //     )
  // }
}
