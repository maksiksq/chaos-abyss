import {articles} from '../data';
import {error} from "@sveltejs/kit";

export const prerender = 'auto';


export const load = ({params}) => {
    const article = articles.find((article) => article.slug === params.slug);
    if (!article) {
        throw error(404, 'Oh noie, article not found.');
    }

    return {
        article
    };
}


