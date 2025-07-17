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
        const isEditing = JSON.parse(formData.get('isEditing'));
        const date = formData.get('date');
        console.log('date!!');
        console.log(typeof date);
        const raw = formData.get('article');

        if (!raw || typeof raw !== 'string') {
            return fail(400, { raw, missing: true });
        }

        const parsedHtml = md.render(raw);

        // @ts-ignore investigate later
        const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                fetch,
            },
            cookies: {
                getAll: () => cookies.getAll(),
                setAll: () => cookies.setAll(),
                delete: (name: any, options: any) => cookies.delete(name, options)
            }
        })

        const {
            data: { user },
            error: authError
        } = await supabase.auth.getUser();

        console.log('user:', user);

        if (!isEditing) {
            const { error } = await supabase
                .from('articles')
                .insert({...details, content: parsedHtml, contentmd: raw, date: toTimestampTZ(new Date())});

            if (error) {
                console.error(error);
            }
        } else {
            const { error } = await supabase
                .from('articles')
                .update({...details, content: parsedHtml, contentmd: raw, date: date, last_edit: toTimestampTZ(new Date())})
                .eq('date', date)

            if (error) {
                console.error(error);
            }
        }

        return { success: true, article: parsedHtml };
    }
} satisfies Actions;