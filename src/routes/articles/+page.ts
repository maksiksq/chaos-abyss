import {error} from "@sveltejs/kit";
import Fuse from "fuse.js";
import {escapeHTML} from "$lib/utils/escapeHTML";
import {timestamptzToISOtz} from "$lib/utils/timestamptzToISOtz";
import {getBrowserClient} from "$lib/utils/getSupabaseBrowserClient";
const baseUrl = "https://chaos-abyss.com";

type Article = {
    category: string;
    slug: string;
    title: string;
    fig?: string;
    figalt?: string;
    figcap?: string;
    blurb: string;
    date: string;
    comment_count?: number;
    content_trim: string;
    accent?: string;
};

export const load = async ({url}) => {
    const supabase = getBrowserClient();
    const {data: summaries, error: artErr} = await supabase
        .from('articles')
        .select('category, slug, title, fig, figalt, blurb, date, comment_count, content_trim, accent, figcap')
        .not('category', 'in.("draft","stashed")')
        .order('date', { ascending: false });
    if (artErr || !summaries) {
        throw error(500, 'Failed to load articles');
    }
    // seo

    let jsonLDArticles = summaries.map((article: Article, index: number) => ({
        "@type": "BlogPosting",
        "headline": article.title,
        "datePublished": article.date ? timestamptzToISOtz(article.date) : undefined,
        "url": `${baseUrl}/articles/${article.category}/${article.slug}`,
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
            searchCount: null,
            fromSearch: !!query,
            query,
            cat,
            meta
        }
    }

    const escapedQuery = escapeHTML(query);

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
    meta.title = `Results for: ${escapedQuery}`;

    updateMeta(meta.metaNamed, 'name', 'twitter:title', `Results for: ${escapedQuery}`);
    updateMeta(meta.metaProperty, 'property', 'og:title', `Results for: ${escapedQuery}`);
    updateMeta(meta.metaNamed, 'name', 'description', `Search results for "${escapedQuery}" on Chaos Abyss.`);
    updateMeta(meta.metaNamed, 'name', 'twitter:description', `Search results for "${escapedQuery}" on Chaos Abyss.`);
    updateMeta(meta.metaProperty, 'property', 'og:description', `Search results for "${escapedQuery}" on Chaos Abyss.`);

    meta.canonUrl = `${baseUrl}/articles?query=${escapedQuery}`;
    updateMeta(meta.metaProperty, 'property', 'og:url', `${baseUrl}/articles?query=${encodeURIComponent(escapedQuery)}`);

    let fuse = new Fuse(summaries, {
        keys: [
            {name: 'title', weight: 0.4},
            {name: 'blurb', weight: 0.2},
            {name: 'category', weight: 0.1},
            {name: 'figcap', weight: 0.03},
            {name: 'figalt', weight: 0.02},
            {name: 'slug', weight: 0.1},
            {name: 'content_trim', weight: 0.15},
        ],
        threshold: 0.45,
        minMatchCharLength: 2,
    });

    let results = fuse.search(query);

    let catResults = cat !== 'Any'
        ? results?.filter((result: any) => result.item.category === cat)
        : results;

    if (!catResults.length) {
        // same if no results
        updateMeta(meta.metaNamed, 'name', 'description', `No results for "${escapedQuery}" on Chaos Abyss.`);
        updateMeta(meta.metaNamed, 'name', 'twitter:description', `No results for "${escapedQuery}" on Chaos Abyss.`);
        updateMeta(meta.metaProperty, 'property', 'og:description', `No results for "${escapedQuery}" on Chaos Abyss.`);

        // !!!
        meta.noindex = true
        return {
            summaries: summaries,
            results: null,
            searchCount: null,
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
    const combinedArticles = [...sumResults.summaries, ...summaries].filter(a => {
        const key = `${a.category}/${a.slug}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    jsonLDArticles = combinedArticles.map((article, index) => ({
        "@type": "BlogPosting",
        "headline": article.title,
        "url": `${baseUrl}/articles/${article.category}/${article.slug}`,
        "position": index + 1
    }));
    meta.jsonLD.mainEntity.itemListElement = jsonLDArticles;

    return {
        summaries,
        results: sumResults,
        searchCount: catResults.length,
        fromSearch: Boolean(query),
        query,
        cat,
        meta
    }
    // cant forget the no query handler up there
}



