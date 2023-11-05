import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export async function middleware(request: NextRequest, response: NextResponse) {
    let cookie = request.cookies;
    let existCookie = cookie.has('hash');
    const pathnameNext = request.nextUrl.pathname;

    if (pathnameNext.startsWith('/fd7aa4b6ecf')) {
            let code = new URL(request.url).searchParams.get('code');
            const headers = new Headers();
            headers.set('Content-Type', 'application/json')
            const res = await fetch('http://127.0.0.1:2023/auth', {
                method: 'POST', 
                headers,
                credentials: 'include',
              body: JSON.stringify({code})     
          });
          
          const userData = await res.json();

          const response = NextResponse.redirect(new URL('/', request.url));
          response.cookies.set({
            name: 'hash',
            value: userData.data.hash,
            path: '*',
            httpOnly: true
          })

      return response;
    }

    if (pathnameNext.startsWith('/auGfswrrr')) {
        let code = new URL(request.url).searchParams.get('code');
        const headers = new Headers();
        headers.set('Content-Type', 'application/json')
        headers.set('Cookie', `hash=${cookie.get('hash')?.value}`)
        fetch('http://127.0.0.1:2023/addGroupto', {
            method: 'POST', 
            headers,
            credentials: 'include',
            body: JSON.stringify({code})     
      });
        // const userData = await res.json();
        const response = NextResponse.redirect(new URL('/mygroups', request.url));
        return response;
    }

    if(!existCookie) {
        if (pathnameNext.startsWith('/cabinet')) {
            return NextResponse.redirect(new URL('/', request.url));
        } else if(pathnameNext.startsWith('/mygroups')) {
            return NextResponse.redirect(new URL('/', request.url));
        } else if(pathnameNext.startsWith('/payments')) {
            return NextResponse.redirect(new URL('/', request.url));
        } else if(pathnameNext.startsWith('/settings')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    //     if (request.nextUrl.pathname.startsWith('/about')) {
    //         return NextResponse.rewrite(new URL('/about-2', request.url));
    //     }
};