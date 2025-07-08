import {error} from "@sveltejs/kit";

import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {createClient} from "@supabase/supabase-js";

let supabase: any | null = null;

const getClient = () => {
    if (!supabase) {
        supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
    }
    return supabase;
}

export const load = async () => {
    const supabase = getClient();
    const { data: articles, error: artErr } = await supabase
        .from('articles')
        .select('category, slug, title, fig, figalt, blurb, date, comment_count')
    if (artErr || !articles) {
        throw error(500, 'Failed to load articles');
    }

    console.log('Articles loaded', articles);
    return {
        summaries: articles
    }
}


