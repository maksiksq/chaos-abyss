import {error} from "@sveltejs/kit";

import Fuse from "fuse.js";
import {getClient} from "$lib/utils/getSupabaseClient";
const baseUrl = "https://chaos-abyss.com";

export const load = async ({url}) => {
    const supabase = getClient();
    const {data: articles, error: artErr} = await supabase
        .from('articles')
        .select('category, slug, title, fig, figalt, blurb, date, comment_count, content, accent, figcap')
        .neq('category', 'draft')
        .order('date', { ascending: false });
    if (artErr || !articles) {
        throw error(500, 'Failed to load articles');
    }

    const summaries = articles.map((article: any) => ({
        ...article,
        contentTrim: article.content.slice(0, 500)
    }))

    // seo

    let jsonLDArticles = articles.map((article: any, index: number) => ({
        "@type": "BlogPosting",
        "headline": article.title,
        "url": `${baseUrl}/articles/${article.slug}`,
        "position": index + 1,
    }));

    // these change with search results
    const description = "Behold the freshest articles on Chaos Abyss.";
    const theUrl = `${baseUrl}/articles`;
    const title = "Articles";

    const meta = {
        title: title,
        canonUrl: theUrl,
        noindex: false,
        metaNamed: [
            {
                name: "description",
                content: description,
            },
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:title", content: title},
            {
                name: "twitter:description",
                content: description,
            },
            {name: "twitter:image", content: `${baseUrl}/img/ogimg.png`}
        ],
        metaProperty: [
            {property: "og:type", content: "website"},
            {property: "og:locale", content: "en_US"},
            {property: "og:title", content: title},
            {
                property: "og:description",
                content: description
            },
            {property: "og:url", content: theUrl},
            {property: "og:image", content: `${baseUrl}/img/ogimg.png`}
        ],
        jsonLD: {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": title,
            "url": theUrl,
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

    const escapeHTML = (str: string) =>
        str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    query = escapeHTML(query);

    const updateMeta = (
        list: { name?: string; property?: string; content: string }[],
        key: 'name' | 'property',
        value: string,
        newContent: string
    ) => {
        const entry = list.find(m => m[key] === value);
        if (entry) entry.content = newContent;
    }

    // here we reassign the meta values because I couldn't
    // come up with better logic
    meta.title = `Results for: ${query}`;

    updateMeta(meta.metaNamed, 'name', 'twitter:title', `Results for: ${query}`);
    updateMeta(meta.metaProperty, 'property', 'og:title', `Results for: ${query}`);
    updateMeta(meta.metaNamed, 'name', 'description', `Search results for "${query}" on Chaos Abyss.`);
    updateMeta(meta.metaNamed, 'name', 'twitter:description', `Search results for "${query}" on Chaos Abyss.`);
    updateMeta(meta.metaProperty, 'property', 'og:description', `Search results for "${query}" on Chaos Abyss.`);

    meta.canonUrl = `${baseUrl}/articles?query=${query}`;
    updateMeta(meta.metaProperty, 'property', 'og:url', `${baseUrl}/articles?query=${query}`);

    let fuse = new Fuse(summaries, {
        keys: [
            {name: 'title', weight: 0.4},
            {name: 'blurb', weight: 0.2},
            {name: 'category', weight: 0.1},
            {name: 'figcap', weight: 0.03},
            {name: 'figalt', weight: 0.02},
            {name: 'slug', weight: 0.1},
            {name: 'contentTrim', weight: 0.15},
        ],
        threshold: 0.45,
        minMatchCharLength: 2,
    });

    let results = fuse.search(query);

    let catResults = cat !== 'Any'
        ? results?.filter((result: any) => result.item.category === cat)
        : results;

    // future use
    const encodedCat = encodeURIComponent(cat);

    if (!catResults.length) {
        // same if no results
        updateMeta(meta.metaNamed, 'name', 'description', `No results for "${query}" on Chaos Abyss.`);
        updateMeta(meta.metaNamed, 'name', 'twitter:description', `No results for "${query}" on Chaos Abyss.`);
        updateMeta(meta.metaProperty, 'property', 'og:description', `No results for "${query}" on Chaos Abyss.`);

        // !!!
        meta.noindex = true
        return {
            summaries: summaries,
            results: null,
            fromSearch: Boolean(query),
            query,
            cat,
            meta
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
        "url": `${baseUrl}/articles/${article.slug}`,
        "position": index + 1
    }));
    meta.jsonLD.mainEntity.itemListElement = jsonLDArticles;

    return {
        summaries,
        results: sumResults,
        fromSearch: Boolean(query),
        query,
        cat,
        meta
    }
    // cant forget the no query handler up there
}



