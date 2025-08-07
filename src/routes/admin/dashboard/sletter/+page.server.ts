import {getClient} from "$lib/utils/getSupabaseClient";
import {type Actions, error as sverror} from "@sveltejs/kit";
import { Resend } from 'resend';

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
        sverror(500, "oh fuck")
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

        if (!text && !associate) {
            console.error('oh no')
            sverror(500, 'oh no')
        }

        // actual sending part
        // NOTE: maximum batch size for Resend is 50
        // + the 100 a day email limit
        // filter csv to only use the subscribed ones later

        dotenv.config();

        const resend = new Resend();

        const getEmails = async () => {
            try {
                const response = await resend.contacts.list({
                    audienceId: '2a9064d6-92c6-42c5-a9dc-85fd7b8eaf78',
                });

                return response?.data?.data.map(obj => obj.email);
            } catch (error) {
                console.log(error);
            }
        }

        const content =
            `
        <p>
        Hey!
        </p>
        <p>
        Just sending this automatic email as confirmation that you signed up to get occasional updates on Lirith. 
        </p>
        <img width="460" src="https://ik.imagekit.io/maksiks/moth.png?tr=w-460" alt="lirith logo">
        <p>
        Thanks!
        </p>
    `

        const emailsBatch = await getEmails();

        const emailsWithInfo = emailsBatch.map((email) => ({
            from: 'Maksiks <lirith@chaos-abyss.com>',
            to: [email],
            subject: 'Lirith updates',
            html: content
        }))

        await resend.batch.send(emailsWithInfo);

        await resend.emails.send([
            {
                from: 'Maksiks <lirith@chaos-abyss.com>',
                to: [email],
                subject: 'Lirith updates',
                html: content
            }
        ]);
    }
} satisfies Actions;