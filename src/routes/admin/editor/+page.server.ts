import {type Actions, fail} from "@sveltejs/kit";
import {md} from "../../shared.svelte";
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

        const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                fetch,
            },
            cookies: {
                getAll: () => cookies.getAll(),
                setAll: () => cookies.setAll(),
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
            .insert({...details, content: parsedHtml, contentmd: raw, date: toTimestampTZ(new Date())});

        if (error) {
            console.error(error);
        }

        return { success: true, article: parsedHtml };
    }
} satisfies Actions;