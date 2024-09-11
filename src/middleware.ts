import { NextRequest, NextResponse } from "next/server";
import { getDecodedToken } from "./util/jwt-decode";
import { admin_routes, super_admin_routes, user_routes } from "./router/routes";

export function middleware(request: NextRequest) {
    const cookieData = request.cookies.get('token')?.value;
    
    if(!cookieData) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const accessToken = JSON.parse(cookieData).access_token;
    const decodedCookie = getDecodedToken(accessToken);

    const roles = decodedCookie?.roles || [];
    const pathname = request.nextUrl.pathname;

    if (roles.includes("SUPER_ADMIN") && super_admin_routes.includes(pathname)) {
        return NextResponse.next();
    }

    if (roles.includes("ADMIN") && admin_routes.includes(pathname)){
        return NextResponse.next();
    }
    
    if (roles.includes("USER") && user_routes.includes(pathname)){
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/unauthorized', request.url));
}

export const config = {
    matcher: ['/dashboard/:path*', '/user/:path*']
}