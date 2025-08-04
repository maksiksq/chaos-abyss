import {type Handle, redirect} from "@sveltejs/kit";


const authGuard: Handle = async ({ event: e, resolve }) => {
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

    console.log("just passing thru in dev environment");

    return resolve(e);
}

export const handle: Handle = authGuard;