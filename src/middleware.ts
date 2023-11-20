import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import Jose from "@/libs/jose";

export async function middleware(request: NextRequest) {
	const pathname: any = request.nextUrl.pathname;
	const cookie: any = request.cookies.get('admin');

	if(pathname.startsWith("/admin") && pathname !== "/admin/login") {
		if(cookie) {
			const { value }: { value: string } = cookie;
			const Jwt = await Jose.verify(value);

			if(Jwt) {
				return NextResponse.next();
			}
			else {
				return NextResponse.redirect(new URL('/admin/login', request.url))
			}
		}
		else {
			return NextResponse.redirect(new URL('/admin/login', request.url))
		}
	}
}

export const config = {
	matcher: [
		'/admin/:path*',
		'/api/:path*',
	]
}

/** 
 * 
 * if(pathname.startsWith("/admin") && pathname !== "/admin/login") {
		if(cookie) {
			const { value }: { value: string } = cookie;
			
			(async () => {
				const jwt = await Jose.sign({data: "lorem ipsum dolor sit amet"});
				const raw = await Jose.verify(value);

				console.log({ value, jwt, raw });
			})();


			return Response.json(
				{ success: false, message: "Authentication failed!" },
				{ status: 401 }
			);
		}

		return Response.json(
			{ success: false, message: "Authentication failed!" },
			{ status: 401 }
		);
	}
 * 
 * 
 * */