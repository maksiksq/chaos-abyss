import {error as sverror} from "@sveltejs/kit";
import {getClient} from "$lib/utils/getSupabaseClient";
import {escapeHTML} from "$lib/utils/escapeHTML";

export const prerender = 'auto';

const authors = [{
    name: 'Maksiks',
    link: '/about',
}]

export const load = async ({params}) => {
    const supabase = getClient();
    // no, i just wanted to name it like that
    const slugcat = params.category;

    // article per slug and category
    const {data: article, error: artErr} = await supabase
        .from('articles')
        .select('*')
        .eq('slug', params.slug)
        .ilike('category', slugcat)
        .single();
    if (artErr || !article ) {
        throw sverror(404, 'Oh no, article not found.');
    }

    article.author ||= "Maksiks";

    // adjacent articles
    const [nextArtRes, previousArtRes] = await Promise.all([
        supabase
            .from('articles')
            .select('title, slug, category')
            .gt('date', article.date)
            .order('date', { ascending: true })
            .limit(1),
        supabase
            .from('articles')
            .select('title, slug, category')
            .lt('date', article.date)
            .order('date', { ascending: false })
            .limit(1),
    ]);

    const next = {
        title: nextArtRes.data?.[0]?.title ?? 'There is nothing but the stars above.',
        slugcat: nextArtRes.data?.[0]?.category ?? undefined,
        slug: nextArtRes.data?.[0]?.slug ?? undefined,
    };

    const previous = {
        title: previousArtRes.data?.[0]?.title ?? 'You’ve reached the bottom of the abyss.',
        slugcat: previousArtRes.data?.[0]?.category ?? undefined,
        slug: previousArtRes.data?.[0]?.slug ?? undefined,
    };

    const adjacent = {previous, next};

    // seo

    const toISODate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'uhm, the date is wrong';
        }
        return date.toISOString().split("T")[0];
    };

    const meta = {
        title: escapeHTML(article.title),
        canonUrl: `https://chaos-abyss.com/articles/${article.category}/${params.slug}`,
        metaNamed: [
            { name: "description", content: escapeHTML(article.blurb) },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: escapeHTML(article.title) },
            { name: "twitter:description", content: escapeHTML(article.blurb) },
            { name: "twitter:image", content: article.fig }
        ],
        metaProperty: [
            { property: "og:type", content: "article" },
            { property: "og:locale", content: "en_US" },
            { property: "og:title", content: escapeHTML(article.title) },
            { property: "og:description", content: escapeHTML(article.blurb) },
            { property: "og:url", content: `https://chaos-abyss.com/articles/${article.category}/${params.slug}` },
            { property: "og:image", content: article.fig }
        ],
        jsonLD: {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": escapeHTML(article.title),
            "author": {
                "@type": "Person",
                "name": article.author
            },
            "name": escapeHTML(article.title),
            "datePublished": toISODate(article.date),
            "url": `https://chaos-abyss.com/articles/${article.category}/${params.slug}`
        }
    };

    // misc

    const wordcount = article.content.trim().replace(/\s+/g, ' ').split(' ').length;
    const authorlink = authors.find(author => author.name === article.author)?.link;

    return {
        article,
        adjacent,
        meta,
        wordcount,
        authorlink,
    };
}
