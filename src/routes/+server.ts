import {error as sverror} from '@sveltejs/kit';
import type {RequestHandler} from './$types';
import {PUBLIC_DEV} from "$env/static/public";
import {SECRET_UNSUBSCRIBE_SECRET} from "$env/static/private";
import {getClient} from "$lib/utils/getSupabaseClient";
import {jwtVerify} from "jose";

export const GET: RequestHandler = async ({url}) => {
    const jwt = url.searchParams.get('jwt');

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

        const supabase = getClient();

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