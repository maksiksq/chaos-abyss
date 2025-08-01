import {error as sverror, type Handle, redirect} from "@sveltejs/kit";
import {createServerClient} from "@supabase/ssr";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {sequence} from "@sveltejs/kit/hooks";

// Supabase SvelteKit example basically:
// https://supabase.com/docs/guides/auth/server-side/sveltekit

const supabase: Handle = async ({event: e, resolve}) => {
    e.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll: () => e.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({name, value, options}) => {
                    e.cookies.set(name, value, {...options, path: '/'});
                })
            }
        }
    })

    e.locals.safeGetSession = async () => {
        const {
            data: {session},
        } = await e.locals.supabase.auth.getSession();
        if (!session) {
            return {session: null, user: null};
        }

        const {
            data: { user },
            error,
        } = await e.locals.supabase.auth.getUser();
        if (error) {
            // JWT is wrong
            return { session: null, user: null }
        }

        return { session, user }
    }

    return resolve(e, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version';
        }
    })
}

const authGuard: Handle = async ({ event: e, resolve }) => {
    const { session, user } = await e.locals.safeGetSession();
    e.locals.session = session;
    e.locals.user = user;

    // admin auth redirects
    // no auth
    if (!e.locals.session && e.url.pathname.startsWith('/admin')) {
        redirect(303, '/admauth');
    }
    // yes auth
    if (e.locals.session && e.url.pathname === '/admauth') {
        redirect(303, '/admin/dashboard');
    }

    // draft/stashed error
    // no auth
    if (!e.locals.session && (e.url.pathname.startsWith('/articles/draft/') || e.url.pathname.startsWith('/articles/stashed/'))) {
        throw sverror(401, 'Oh no. This is the dungeon, we don\'t go here.');
    }

    return resolve(e);
}

const redirects: Handle = async ({ event: e, resolve }) => {
    const current = e.url.pathname;

    const { data, error } = await e.locals.supabase
        .from('redirects')
        .select('to')
        .eq('from', current)
        .single()

    if (data?.to) {
        redirect(301, data?.to)
    }

    return resolve(e);
}

export const handle: Handle = sequence(supabase, authGuard, redirects);