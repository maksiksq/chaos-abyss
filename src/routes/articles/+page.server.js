import {articles} from '../shared';

export const load = () => {
    return {
        summaries: articles.map((article) => ({
            slug: article.slug,
            title: article.title
        }))
    }
}


