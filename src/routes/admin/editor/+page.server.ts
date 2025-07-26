import {type Actions, fail, redirect} from "@sveltejs/kit";
import {md} from "../../shared.svelte";
import {toTimestampTZ} from "$lib/utils/dateToTimestamptz";
import {createServerClient} from "@supabase/ssr";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";


export const load = async ({url}) => {
    if (url.searchParams.get("clean") === "true") {
        return {clean: true};
    } else {
        return {clean: false};
    }
}

export const actions = {
    newArticle: async ({ cookies, request }: any) => {
        const formData = await request.formData();
        const details = JSON.parse(formData.get('details'));
        const isEditing = JSON.parse(formData.get('isEditing'));
        const date = formData.get('date');
        const contentTrim = formData.get('contentTrim');
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

        if (authError) {
            return { success: false, threat: 'Uhm, uhm, who are you??'};
        }

        if (!isEditing) {
            const { error } = await supabase
                .from('articles')
                .insert({...details, content: parsedHtml, contentmd: raw, content_trim: contentTrim, date: null, last_edit: null, creation_date: toTimestampTZ(new Date())});

            if (error) {
                console.error(error);
                if (error.code === '23505') {
                    return { success: false, threat: "Could not create article. How pathetic. Duplicate value (probably slug?)."};
                }
                return { success: false, threat: "Could not create article. It's console checking time."};
            }

            return { success: true };
        } else {
            const { data: oldSlug, error: slugError } = await supabase
                .from('articles')
                .select('slug')
                .eq('uuid', details.uuid)
                .single()

            if (slugError) {
                console.error(slugError);
                return { success: false, threat: "Could not get old slug. It's console checking time."};
            }

            if (details.slug !== oldSlug.slug) {
                const { error } = await supabase
                    .from('redirects')
                    .insert({from: `/articles/${details.category}/${oldSlug.slug}`, to: `/articles/${details.category}/${details.slug}`});

                if (error) {
                    console.error(error);
                    return { success: false, threat: "Could create redirect. It's console checking time."};
                }
            }


            const { error } = await supabase
                .from('articles')
                .update({...details, content: parsedHtml, contentmd: raw, content_trim: contentTrim, date: date, last_edit: toTimestampTZ(new Date())})
                .eq('uuid', details.uuid)
            if (error) {
                console.error(error);
                if (error.code === '23505') {
                    return { success: false, threat: "Could not update article. How pathetic. Duplicate value (probably slug?)."};
                }
                return { success: false, threat: "Could not update article. It's console checking time."};
            }

            return { success: true };
        }
    }
} satisfies Actions;