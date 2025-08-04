import {error as sverror, type Handle, redirect} from "@sveltejs/kit";
import {createServerClient} from "@supabase/ssr";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {sequence} from "@sveltejs/kit/hooks";

// Supabase SvelteKit example basically:
// https://supabase.com/docs/guides/auth/server-side/sveltekit


const authGuard: Handle = async ({ event: e, resolve }) => {
    const session = false;
    const user = false;
    console.log(session);
    console.log(user);
    console.log('haiiiiiiii');

    // admin auth redirects
    // no auth
    if (!e.locals.session && e.url.pathname.startsWith('/admin')) {
        console.log('redirecting to admauth')
        redirect(303, '/admauth');
    }
    // yes auth
    if (e.locals.session && e.url.pathname === '/admauth') {
        console.log('redirecting to admin dashboard')
        redirect(303, '/admin/dashboard');
    }

    // draft/stashed error
    // no auth
    if (!e.locals.session && (e.url.pathname.startsWith('/articles/draft/') || e.url.pathname.startsWith('/articles/stashed/'))) {
        throw sverror(401, 'Oh no. This is the dungeon, we don\'t go here.');
    }

    console.log("so are we just passing or what");

    return resolve(e);
}

export const handle: Handle = authGuard;