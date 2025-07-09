import {error} from "@sveltejs/kit";

import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {createClient} from "@supabase/supabase-js";
import Fuse from "fuse.js";

let supabase: any | null = null;
const getClient = () => {
    if (!supabase) {
        supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
    }
    return supabase;
}

export const load = async ({url}) => {
    const supabase = getClient();
    const {data: articles, error: artErr} = await supabase
        .from('articles')
        .select('category, slug, title, fig, figalt, blurb, date, comment_count, content, accent')
        .neq('category', 'draft')
    if (artErr || !articles) {
        throw error(500, 'Failed to load articles');
    }

    const wpm = 225;
    const estReadingTime = (content: string): number => {
        const words = content.trim().split(/\s+/).length;
        return Math.max(1, Math.round(words / wpm));
    }

    const summaries = articles.map((article: any) => ({
        ...article,
        contentTrim: article.content.slice(0, 500),
        time: estReadingTime(article.content),
    }))

    // search
    let query = url.searchParams.get("query");
    let cat = url.searchParams.get("category") ?? 'Any';

    if (!query) {
        return {
            summaries: summaries,
            results: null,
            fromSearch: !!query,
            query: query,
            cat: cat
        }
    }

    let fuse = new Fuse(summaries, {
        keys: [
            {name: 'title', weight: 0.4},
            {name: 'blurb', weight: 0.2},
            {name: 'category', weight: 0.1},
            {name: 'figcap', weight: 0.03},
            {name: 'figalt', weight: 0.02},
            {name: 'slug', weight: 0.1},
            {name: 'contentTrim', weight: 0.15},
        ], threshold: 0.4
    });

    let results = fuse.search(query);

    let catResults = cat !== 'Any'
        ? results?.filter((result: any) => result.item.category === cat)
        : results;

    if (!catResults.length) {
        return {
            summaries: summaries,
            results: null,
            fromSearch: !!query,
            query: query,
            cat: cat
        }
    }

    let sumResults = {
        summaries:
            catResults?.map(({item, refIndex}: any) => ({
                ...item,
                refIndex
            }))
    };

    return {
        summaries: summaries,
        results: sumResults,
        fromSearch: !!query,
        query: query,
        cat: cat
    }
}



