import {error as sverror} from "@sveltejs/kit";
import {getClient} from "$lib/utils/getSupabaseClient";

export const prerender = 'auto';

const authors = [{
    name: 'Maksiks',
    link: '/about',
}]

type Article = {
    category: string;
    slug: string;
    title: string;
    fig: string;
    widefig: string;
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
    if (artErr || !artData || artData.length === 0) {
        throw sverror(404, 'Oh no, article not found.');
    }


    const article: Article = artData[0];
    article.author ||= "Maksiks";

    // adjacent articles
    const {data: nextArt} = await supabase
        .from('articles')
        .select('title, slug')
        .gt('date', article.date)
        .order('date', { ascending: true })
        .limit(1);

    const {data: previousArt} = await supabase
        .from('articles')
        .select('title, slug')
        .lt('date', article.date)
        .order('date', { ascending: false })
        .limit(1);

    const previous = {
        title: previousArt[0]?.title ?? 'You’ve reached the bottom of the abyss.',
        slug: previousArt[0]?.slug ?? undefined,
    };

    const next = {
        title: nextArt[0]?.title ?? 'There is nothing but the stars above.',
        slug: nextArt[0]?.slug ?? undefined,
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
        canonUrl: `https://chaos-abyss.com/articles/${params.slug}`,
        metaNamed: [
            { name: "description", content: article.blurb },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: capitalize(article.title) },
            { name: "twitter:description", content: article.blurb },
            { name: "twitter:image", content: article.fig }
        ],
        metaProperty: [
            { property: "og:type", content: "article" },
            { property: "og:locale", content: "en_US" },
            { property: "og:title", content: capitalize(article.title) },
            { property: "og:description", content: article.blurb },
            { property: "og:url", content: `https://chaos-abyss.com/articles/${params.slug}` },
            { property: "og:image", content: article.fig }
        ],
        jsonLD: {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "author": {
                "@type": "Person",
                "name": article.author
            },
            "name": article.title,
            "datePublished": toISODate(article.date),
            "url": `https://chaos-abyss.com/articles/${params.slug}`
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
