import { NextRequest, NextResponse } from "next/server";
import { getDecodedToken } from "./util/jwt-decode";
import { authRoutes, protectedRoutes } from "./router/routes";

export function middleware(request: NextRequest) {
    const cookieData = request.cookies.get('token')?.value;
    const tokenData= getDecodedToken(cookieData as string);

    if (!tokenData) return NextResponse.next();

    if (
        protectedRoutes.includes(request.nextUrl.pathname) &&
        (!cookieData || Date.now() >= tokenData.exp * 1000)
    ) {  
        request.cookies.delete('token');
        const response = NextResponse.redirect(new URL("/login", request.url));
        
        return response;
    }

    const adminRoles = ['ADMIN', 'SUPER_ADMIN'];
    const isAdmin = tokenData?.roles.some((role: string) => adminRoles.includes(role));
    const isUser = tokenData?.roles.some((role: string) => "USER" === role);

    if (authRoutes.includes(request.nextUrl.pathname)) {
        if (isAdmin) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }else if (isUser) {
            return NextResponse.redirect(new URL("/psb", request.url));
        }
    }

    return NextResponse.next();
}
