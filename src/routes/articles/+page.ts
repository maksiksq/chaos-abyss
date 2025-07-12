import {error} from "@sveltejs/kit";

import Fuse from "fuse.js";
import {getClient} from "$lib/utils/getSupabaseClient";

export const load = async ({url}) => {
    const supabase = getClient();
    const {data: articles, error: artErr} = await supabase
        .from('articles')
        .select('category, slug, title, fig, figalt, blurb, date, comment_count, content, accent')
        .neq('category', 'draft')
        .order('date', { ascending: false });
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

    // seo

    let jsonLDArticles = articles.map((article: any, index: number) => ({
        "@type": "BlogPosting",
        "headline": article.title,
        "url": `https://chaos-abyss.com/articles/${article.slug}`,
        "position": index + 1,
    }));

    const meta = {
        title: "Articles",
        canonUrl: "https://chaos-abyss.com/articles",
        metaNamed: [
            {
                name: "description",
                content: "Behold the freshest articles on Chaos Abyss."
            },
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:title", content: "Articles"},
            {
                name: "twitter:description",
                content: "Behold the freshest articles on Chaos Abyss"
            },
            {name: "twitter:image", content: "https://chaos-abyss.com/img/ogimg.png"}
        ],
        metaProperty: [
            {property: "og:type", content: "website"},
            {property: "og:locale", content: "en_US"},
            {property: "og:title", content: "Chaos Abyss"},
            {
                property: "og:description",
                content: "Behold the freshest articles on Chaos Abyss."
            },
            {property: "og:url", content: "https://chaos-abyss.com/articles"},
            {property: "og:image", content: "https://chaos-abyss.com/img/ogimg.png"}
        ],
        jsonLD: {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Chaos Abyss",
            "url": "https://chaos-abyss.com/articles",
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": jsonLDArticles,
            }
        }
    }

    // search
    let query = url.searchParams.get("query");
    let cat = url.searchParams.get("category") ?? 'Any';

    if (!query) {
        return {
            summaries,
            results: null,
            fromSearch: !!query,
            query,
            cat,
            meta
        }
    }

    meta.title = `Results for: ${query}`;

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

    // meta for search results
    const seen = new Set();
    const combinedArticles = [...sumResults.summaries, ...articles].filter(a => {
        if (seen.has(a.slug)) return false;
        seen.add(a.slug);
        return true;
    });

    jsonLDArticles = combinedArticles.map((article, index) => ({
        "@type": "BlogPosting",
        "headline": article.title,
        "url": `https://chaos-abyss.com/articles/${article.slug}`,
        "position": index + 1
    }));
    meta.jsonLD = jsonLDArticles;

    return {
        summaries,
        results: sumResults,
        fromSearch: !!query,
        query,
        cat,
        meta
    }
    // cant forget the no query handler up there
}



