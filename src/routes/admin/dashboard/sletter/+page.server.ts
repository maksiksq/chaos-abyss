import {getClient} from "$lib/utils/getSupabaseClient";
import {type Actions, error as sverror} from "@sveltejs/kit";
import { Resend } from 'resend';
import {SECRET_RESEND_API_KEY, SECRET_UNSUBSCRIBE_SECRET} from "$env/static/private";
import {SignJWT} from "jose";

export const prerender = false;

export const load = async ({url}) => {
    const title = url.searchParams.get('title');
    const fig = url.searchParams.get('fig');
    const figalt = url.searchParams.get('figalt');
    const associate = url.searchParams.get('associate');

    const supabase = getClient();

    const {data: slugs, error} = await supabase
        .from('articles')
        .select('slug')
        .neq('slettered', true)
    ;

    if (error) {
        console.error(error);
        throw sverror(500, "oh fuck")
    }

    return {
        title,
        fig,
        figalt,
        associate,
        slugs
    }
}

export const actions = {
    send: async ({ request }) => {
        const formData = await request.formData();
        const text = formData.get('text');
        const associate = formData.get('associate');

        if (!text || !associate) {
            console.error('oh no')
            throw sverror(500, 'oh no')
        }

        // actual sending part
        // NOTE: maximum batch size for Resend is 50
        // (handled below)
        //
        // + the 100 a day email limit

        const resend = new Resend(SECRET_RESEND_API_KEY);

        const supabase = getClient();

        const {data: emails, error: sberror} = await supabase
            .from('newsletter')
            .select('email')
            .neq('subscribed', false)

        if (!emails || sberror) {
            console.error(sberror);
            throw sverror(500, 'oh no')
        }

        const createJWT = async (email: string)=> {
            return await new SignJWT({
                email
            }).setProtectedHeader({
                alg: "HS256"
            }).setIssuedAt().setExpirationTime("90d").sign(new TextEncoder().encode(SECRET_UNSUBSCRIBE_SECRET));
        }

        const emailsWithInfo = await Promise.all(emails?.map(async ({email}: {email: string}) => {
            return {
            from: 'Maksiks <newsletter@chaos-abyss.com>',
            to: [email],
            subject: 'Chaos Abyss Newsletter',
            html:
                `
                ${text}
                <small style="color: gray">This one's no good for replies, contact me at maksiks.touch@gmail.com instead.</small><br>
                <small><a style="color: gray" href="https://www.chaos-abyss.com/api/unsubscribe?jwt=${await createJWT(email)}&lirith=true">unsubscribe</a></small>

                `
        }}));

        if (!emailsWithInfo) return;
        const batches = Array.from({ length: Math.ceil(emailsWithInfo.length / 50) }, (_, i) => emailsWithInfo.slice(i * 50, i * 50 + 50));

        for (const batch of batches) {
            await resend.batch.send(batch);
        }

    }
} satisfies Actions;