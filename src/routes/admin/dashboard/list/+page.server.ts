import {getClient} from "$lib/utils/getSupabaseClient";
import {type Actions, fail} from "@sveltejs/kit";
import {md} from "../../../shared.svelte";
import {createServerClient} from "@supabase/ssr";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {toTimestampTZ} from "$lib/utils/dateToTimestamptz";

export const load = async () => {
    const supabase = getClient();

    const { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });

    return {articles};
}

export const actions = {
    publish: async ({ cookies, request }: any) => {
        const formData = await request.formData();
        const uuid = JSON.parse(formData.get('uuid'));
        const category = JSON.parse(formData.get('category'));
        const oldDate = JSON.parse(formData.get('date'));

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

        if (authError) {
            return { success: false, threat: 'Uhm, uhm, who are you??'};
        }

        const wasPublishedBefore = false;

        const date = wasPublishedBefore ? oldDate : toTimestampTZ(new Date());

        const { error } = await supabase
                .from('articles')
                .update({category: category, date: date})
                .eq('uuid', uuid)
            if (error) {
                console.error(error);
                if (error.code === '23505') {
                    return { success: false, threat: "Could not update article. How pathetic. Duplicate value (probably slug?)."};
                }
                return { success: false, threat: "Could not update article. It's console checking time."};
            }
            return { success: true };
    },
    draftify: async ({ request, locals: { supabase } }) => {

    }
} satisfies Actions
