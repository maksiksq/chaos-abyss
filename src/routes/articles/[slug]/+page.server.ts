import {articles} from '../data';

export const prerender = 'auto';

export const load = ({params}) => {
    const article = articles.find((article) => article.slug === params.slug)


    return {
        article
    };
}


