import {error as sverror} from "@sveltejs/kit";
import {createClient} from '@supabase/supabase-js';

import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
const authors = [{
    name: 'Maksiks',
    link: '/about',
}]

type Article = {
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
};


export const prerender = 'auto';

export const load = async ({params}) => {
    const { data, error } = await supabase
        .from('articles')
        .select('*');
    const articles: Article[] | null = data;
    if (error || !articles) {
        throw sverror(404, 'Oh no, article not found.');
    }

    const i = articles.findIndex((article) => article.slug === params.slug);

    const article = articles[i];


    const previous = {
        title: articles[i-1]?.title ?? 'You\'ve reached the bottom of the abyss.',
        slug: articles[i-1]?.slug ?? undefined,
    };
    const next = {
        title: articles[i+1]?.title ?? 'This is the freshest baked article on the site. Can\'t go beyond that.',
        slug: articles[i+1]?.slug ?? undefined,
    };

    const adjacent = { previous, next };

    const wordcount = article.content.trim().split(/\s+/).length;
    const authorlink = authors.find(author => author.name === article.author)?.link;

    return {
        article,
        wordcount,
        authorlink,
        adjacent
    };
}


