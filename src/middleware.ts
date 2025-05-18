import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const protectedRoutes = ["/profile"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Nếu đã đăng nhập  → chuyển về trang chủ
  if (
    (pathname.startsWith("/dang-nhap") ||
      pathname.startsWith("/quen-mat-khau")) &&
    token
  ) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      await jose.jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/", request.url));
    } catch (err) {
      console.log(err);

      return NextResponse.next();
    }
  }

  if (
    pathname.startsWith("/dang-nhap") ||
    pathname.startsWith("/quen-mat-khau")
  ) {
    return NextResponse.next();
  }
  // Nếu route nằm trong protect
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      // return NextResponse.redirect(new URL("/dang-nhap", request.url));
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      await jose.jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      console.log(err);
      return NextResponse.redirect(new URL("/dang-nhap", request.url));
    }
  }

  // Các route còn lại đều được phép truy cập tự do
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
