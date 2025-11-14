import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { protectedPaths } from '../constant'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
        cookies: {
            getAll() {
                return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                supabaseResponse = NextResponse.next({
                    request,
                })
                cookiesToSet.forEach(({ name, value }) => supabaseResponse.cookies.set(name, value))
            },
        },
        }
    )

    const { data } = await supabase.auth.getSession();
    const url = new URL(request.url);
    if (data.session) {
        if (url.pathname === "/auth") {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return supabaseResponse;
    } else {
        if (protectedPaths.includes(url.pathname)) {
            return NextResponse.redirect(
                new URL("/auth?next=" + url.pathname, request.url)
            );
        }
        return supabaseResponse;
    }
}