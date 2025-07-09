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
        .select('category, slug, title, fig, figalt, blurb, date, comment_count, content')
    if (artErr || !articles) {
        throw error(500, 'Failed to load articles');
    }

    type ArticleSearch = {
        id: number,
        category: string,
        title: string,
        blurb: string,
        figcap?: string,
        figalt: string,
        slug: string,
        content: string
    }

    const contentTrim = articles?.content.slice(0, 500);
    articles.push(contentTrim);

    return {
        summaries: articles,
    }
}


