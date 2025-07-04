import {articles} from '../shared.ts';

export const load = () => {
    return {
        summaries: articles.map((article) => ({
            slug: article.slug,
            title: article.title
        }))
    }
}


