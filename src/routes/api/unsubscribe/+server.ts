import {error as sverror} from '@sveltejs/kit';
import type {RequestHandler} from './$types';
import {PUBLIC_DEV, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {SECRET_UNSUBSCRIBE_SECRET, SECRET_SUPABASE_SERVICE_ROLE_KEY} from "$env/static/private";
import {jwtVerify} from "jose";
import {createClient} from "@supabase/supabase-js";

export const GET: RequestHandler = async ({url, cookies}) => {
    const jwt = url.searchParams.get('jwt');
    console.log("OH HI");

    if (!jwt) {
        sverror(400, 'Invalid token')
    }

    try {
        const { payload } = await jwtVerify(jwt, new TextEncoder().encode(SECRET_UNSUBSCRIBE_SECRET), {
            algorithms: ['HS256']
        });
        if (PUBLIC_DEV) {
            console.log("Verified payload:", payload);
        }

        const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_ROLE_KEY)

        const {error} = await supabase
            .from('waitlist')
            .update({subscribed: false})
            .eq('email', payload.email)

        if (error) {
            if (PUBLIC_DEV) {
                console.error(error)
            }
            sverror(400, 'Failed to unsubscribe')
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        if (PUBLIC_DEV) {
            console.error("JWT verification failed:", err);
        }
        sverror(401, 'Invalid token')
    }

};