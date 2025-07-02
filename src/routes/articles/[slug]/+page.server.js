import {articles} from '../data'

export const load = ({params}) => {
    const article = articles.find((article) => article.slug === params.slug)


    return {
        article
    };
}


