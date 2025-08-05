import {error} from "@sveltejs/kit";
import Fuse from "fuse.js";
import {escapeHTML} from "$lib/utils/escapeHTML";
import {timestamptzToISOtz} from "$lib/utils/timestamptzToISOtz";
import {getBrowserClient} from "$lib/utils/getSupabaseBrowserClient";
import {getClient} from "$lib/utils/getSupabaseClient";
import {browser} from "$app/environment";
import type {PageLoad} from "../../../.svelte-kit/types/src/routes/articles/$types";
const baseUrl = "https://www.chaos-abyss.com";

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

export const load: PageLoad = async ({url}) => {
    const supabase = browser ? getBrowserClient() : getClient();
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
    let cat = url.searchParams.get("category") ?? 'any';

    const validCats = new Set(summaries.map((s: typeof summaries[number]) => s.category));
    if (!validCats.has(cat) && cat !== 'any') cat = 'any';

    if (!query) {
        return {
            summaries,
            results: null,
            searchCount: null,
            fromSearch: !!query,
            noResultsTxt: 'The abyss gave no reply.',
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

    const canonSearch = new URLSearchParams();
    canonSearch.set("query", escapedQuery);
    if (cat !== 'any') canonSearch.set("category", cat);
    meta.canonUrl = `${baseUrl}/articles?${canonSearch.toString()}`;
    updateMeta(meta.metaProperty, 'property', 'og:url', meta.canonUrl);

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

    let catResults = cat !== 'any'
        ? results?.filter((result: any) => result.item.category === cat)
        : results;

    if (!catResults.length) {
        // same if no results
        updateMeta(meta.metaNamed, 'name', 'description', `No results for "${escapedQuery}" on Chaos Abyss.`);
        updateMeta(meta.metaNamed, 'name', 'twitter:description', `No results for "${escapedQuery}" on Chaos Abyss.`);
        updateMeta(meta.metaProperty, 'property', 'og:description', `No results for "${escapedQuery}" on Chaos Abyss.`);

        // easter eggs

        const isOneCharOff = (a: string, b: string) => {
            a = a.toLowerCase()
            b = b.toLowerCase()

            if (a===b) return true;

            const lenDiff = Math.abs(a.length - b.length);
            if (lenDiff > 1) return false;

            if (a.length === b.length) {
                let diff = 0;
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) diff++;
                    if (diff > 1) return false;
                }
                return diff === 1;
            }

            let [shorter, longer] = a.length < b.length ? [a, b] : [b, a];
            let i = 0, j = 0, mismatch = false;
            while (i < shorter.length && j < longer.length) {
                if (shorter[i] !== longer[j]) {
                    if (mismatch) return false;
                    mismatch = true;
                    j++;
                } else {
                    i++;
                    j++;
                }
            }
            return true;
        }

        const easterEggs = [
            {
                "result": "You're doing great!",
                "options": ["how do I search", "is this how this works?"]
            },
            {
                "result": "There is no escape.",
                "options": ["escape", "run"]
            },
            {
                "result": "[null]",
                "options": ["herobrine", "creepypasta"]
            },
            {
                "result": "Oh no, you broke it. (jk)",
                "options": ["undefined", "null"]
            },
            {
                "result": "Don't search for search. It's right here.",
                "options": ["search", "search..."]
            },
            {
                "result": "*Stares in confusion.*",
                "options": ["...", "stares in confusion"]
            },
            {
                "result": "Coffee??? WHERE? I CAN'T SEE IT!!! WHERE",
                "options": ["coffee", "caffeine"]
            },
            {
                "result": "Drawn to the glow. Even if it burns.",
                "options": ["lepidoptera", "a lantern"]
            },
            {
                "result": "One task remains: forgive yourself.",
                "options": ["to-do list", "to-do"]
            },
            {
                "result": "You typed that, not me.",
                "options": ["why am I here", "what am I doing here"]
            },
            {
                "result": "Same...",
                "options": ["can't sleep", "sleepless"]
            },
            {
                "result": "You may not rest, there are crickets nearby.",
                "options": ["trying to sleep"]
            },
            {
                "result": "There's noise even in silence if you listen long enough.",
                "options": ["quiet", "midnight"]
            },
        ]

        easterEggs.push({
            // this number is always 1 more than the actual amount
            // because I am incredibly evil
            "result": `And there's at least ${easterEggs.length+1} more.`,
            "options": ["easter egg", "secrets"]
        })

        const getNoResultsTxt = (q: string) => {
            const match = easterEggs.find(e => {
                return e.options.some(o => isOneCharOff(q, o));
            });

            return match ? match.result : "The abyss gave no reply.";
        }

        const noResultsTxt = getNoResultsTxt(query);

        // !!!
        meta.noindex = true
        return {
            summaries: summaries,
            results: null,
            searchCount: null,
            fromSearch: Boolean(query),
            noResultsTxt,
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
        noResultsTxt: 'Success.',
        cat,
        meta
    }
    // cant forget the no query handler up there
}



