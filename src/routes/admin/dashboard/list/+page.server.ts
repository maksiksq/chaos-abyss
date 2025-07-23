import {getClient} from "$lib/utils/getSupabaseClient";
import {type Actions, fail} from "@sveltejs/kit";
import {createServerClient} from "@supabase/ssr";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {toTimestampTZ} from "$lib/utils/dateToTimestamptz";

export const load = async () => {
    const supabase = getClient();

    const {data: articles, error} = await supabase
        .from('articles')
        .select('*')
        .order('date', {ascending: false});

    return {articles};
}

export const actions = {
    publish: async ({cookies, request, params}: any) => {
        const formData = await request.formData();
        const article = JSON.parse(formData.get('article'));
        const category = JSON.parse(formData.get('category'));

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
            error: authError
        } = await supabase.auth.getUser();

        if (authError) {
            return {threat: 'Uhm, uhm, who are you??'};
        }

        const {error} = await supabase
            .from('articles')
            .update({category: category, date: article.date ? article.date : toTimestampTZ(new Date())})
            .eq('uuid', article.uuid)
        if (error) {
            console.error(error);
            if (error.code === '23505') {
                return {threat: "Could not publish article. How pathetic. Duplicate value (probably slug?)."};
            }
            return {threat: "Could not publish article. It's console checking time."};
        }

        return {threat: 'Successfully published the article!'};
    },
    draftify: async ({cookies, request}: any) => {
        const formData = await request.formData();
        const uuid = JSON.parse(formData.get('uuid'));

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
            error: authError
        } = await supabase.auth.getUser();

        if (authError) {
            return {threat: 'Uhm, uhm, who are you??'};
        }

        const {error} = await supabase
            .from('articles')
            .update({category: 'draft'})
            .eq('uuid', uuid)
        if (error) {
            return {threat: "Could not draftify article. It's console checking time."};
        }

        return {threat: 'Draftified the article!'};
    },
    stash: async ({cookies, request}: any) => {
        const formData = await request.formData();
        const uuid = JSON.parse(formData.get('uuid'));

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
            error: authError
        } = await supabase.auth.getUser();

        if (authError) {
            return {threat: 'Uhm, uhm, who are you???'};
        }

        const {error} = await supabase
            .from('articles')
            .update({category: 'stashed'})
            .eq('uuid', uuid)
        if (error) {
            return {threat: "Could not stash article. It came back from the death realm to haunt you muhahahaha."};
        }

        return {threat: 'Stashed the article!'};
    }
} satisfies Actions
