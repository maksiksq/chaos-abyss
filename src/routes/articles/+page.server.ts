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
        .neq('category', 'draft')
    if (artErr || !articles) {
        throw error(500, 'Failed to load articles');
    }

    const wpm = 225;
    const estReadingTime = (content: string): number => {
        const words = content.trim().split(/\s+/).length;
        return Math.max(1, Math.round(words / wpm));
    }

    const trimArticles = articles.map((article: any) => ({
        ...article,
        contentTrim: article.content.slice(0, 500),
        time: estReadingTime(article.content)
    }))
    return {
        summaries: trimArticles,
    }
}


