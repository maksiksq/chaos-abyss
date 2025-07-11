import {error as sverror} from "@sveltejs/kit";
import {createClient} from '@supabase/supabase-js';

import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

export const prerender = 'auto';

let supabase: any | null = null;
const getClient = () => {
    if (!supabase) {
        supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
    }
    return supabase;
}

const authors = [{
    name: 'Maksiks',
    link: '/about',
}]

type Article = {
    category: string;
    slug: string;
    title: string;
    fig: string;
    figcap?: string;
    figalt: string;
    blurb: string;
    date: string;
    author: string;
    accent: string;
    content: string;
    commentCount: number;
    id: number;
};

export const load = async ({params}) => {
    const supabase = getClient();
    // article per slug
    const {data: artData, error: artErr} = await supabase
        .from('articles')
        .select('*')
        .eq('slug', params.slug);
    if (artErr || !artData) {
        throw sverror(404, 'Oh no, article not found.');
    }

    const article: Article = artData[0];


    // adjacent articles
    const {data: adjData, error: adjErr} = await supabase
        .from('articles')
        .select('title, slug, id')
        .in('id', [article.id - 1, article.id + 1]);

    if (adjErr || !adjData) {
        throw sverror(500, 'You broke the space time-continuum. Previous and next articles don\'t exist.');
    }
    const previousArt = adjData.find((a: {
        title: string,
        slug: string,
        id: number
    }) => a.id === article.id - 1) ?? null;
    const nextArt = adjData.find((a: { title: string, slug: string, id: number }) => a.id === article.id + 1) ?? null;

    const previous = {
        title: previousArt?.title ?? 'You’ve reached the bottom of the abyss.',
        slug: previousArt?.slug ?? undefined,
    };

    const next = {
        title: nextArt?.title ?? 'There is nothing but the stars above.',
        slug: nextArt?.slug ?? undefined,
    };

    const adjacent = {previous, next};

    // seo

    const capitalize = (str: string) => str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

    const toISODate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'uhm, the date is wrong';
        }
        return date.toISOString().split("T")[0];
    };

    const meta = {
        title: capitalize(article.title),
        canonUrl: `https://chaos-abyss.com/articles/${article.slug}`,
        metaNamed: [
            { name: "description", content: article.blurb },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: capitalize(article.title) },
            { name: "twitter:description", content: article.blurb },
            { name: "twitter:image", content: "https://chaos-abyss.com/img/ogimg.png" }
            // later `https://chaos-abyss.com/img/${article.img}.webp or cloudflare images`
        ],
        metaProperty: [
            { property: "og:type", content: "article" },
            { property: "og:locale", content: "en_US" },
            { property: "og:title", content: capitalize(article.title) },
            { property: "og:description", content: article.blurb },
            { property: "og:url", content: `https://chaos-abyss.com/articles/${article.slug}` },
            { property: "og:image", content: "https://chaos-abyss.com/img/ogimg.png" }
            // later `https://chaos-abyss.com/img/${article.img}.webp or cloudflare images`
        ],
        jsonLD: {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "author": {
                "@type": "Person",
                "name": article.author || "Maksiks"
            },
            "name": article.title,
            "datePublished": toISODate(article.date),
            "url": `https://chaos-abyss.com/articles/${article.slug}`
        }
    };

    // misc

    const wordcount = article.content.trim().split(/\s+/).length;
    const authorlink = authors.find(author => author.name === article.author)?.link;


    return {
        article,
        adjacent,
        meta,
        wordcount,
        authorlink,
    };
}
