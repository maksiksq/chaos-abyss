import {articles} from '../data';
import {error} from "@sveltejs/kit";

export const prerender = 'auto';


export const load = ({params}) => {
    const i = articles.findIndex((article) => article.slug === params.slug);

    const article = articles[i];
    if (!article) {
        throw error(404, 'Oh noie, article not found.');
    }

    const previous = {
        title: articles[i-1]?.title ?? 'This is the freshest baked article on the site. Can\'t go beyond that.',
        slug: articles[i-1]?.slug ?? 'no slug'
    };
    const next = {
        title: articles[i+1]?.title ?? 'You\'ve reached the bottom of the abyss.',
        slug: articles[i+1]?.slug ?? 'no slug'
    };

    const adjacent = { previous, next };

    return {
        article,
        adjacent
    };
}


