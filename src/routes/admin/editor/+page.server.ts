import {type Actions, fail} from "@sveltejs/kit";
import {readFileSync, writeFileSync} from 'fs';
import {md} from "../../shared";
import {getClient} from "$lib/utils/getSupabaseClient";
import {toTimestampTZ} from "$lib/utils/dateToTimestamptz";
import {createServerClient} from "@supabase/ssr";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";


export const load = async () => {
}

export const actions = {
    newArticle: async ({ cookies, request }: any) => {
        const formData = await request.formData();
        const details = JSON.parse(formData.get('details'));
        const raw = formData.get('article');

        if (!raw || typeof raw !== 'string') {
            return fail(400, { raw, missing: true });
        }

        const parsedHtml = md.render(raw);

        const data = JSON.parse(readFileSync('./src/routes/data.json', 'utf8'));

        data.push(
            {
                slug: 'editormade3',
                title: 'THIS IS NOT THE ARTICLE YOU\'RE LOOKING FOR',
                fig: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200',
                figcap: 'non',
                figalt: 'a really cool cat',
                blurb: 'may the force be meow you',
                date: '2025-06-20',
                author: 'Meeeeeeeeeeee',
                authorLink: '#',

                content: parsedHtml,
            }
        );

        console.log({...details, date: toTimestampTZ(new Date())})

        const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                fetch,
            },
            cookies: {
                get: (key) => cookies.get(key),
                getAll: () => cookies.getAll(),
                set: (name, value, options) => cookies.set(name, value, options),
                delete: (name, options) => cookies.delete(name, options)
            }
        })

        console.log(supabase);

        const {
            data: { user },
            error: authError
        } = await supabase.auth.getUser();

        console.log('user:', user);

        const { error } = await supabase
            .from('articles')
            .insert({...details, content: parsedHtml, date: toTimestampTZ(new Date())});

        if (error) {
            console.error(error);
        }

        return { success: true, article: parsedHtml };
    }
} satisfies Actions;