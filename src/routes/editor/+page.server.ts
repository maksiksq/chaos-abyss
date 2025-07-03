import type { Actions } from './$types';

export const load = async () => {
    const whatever = 'whatever';
    return { whatever };
}

export const actions = {
    newArticle: async ({ request }) => {
        const formData = await request.formData();
        const article = formData.get('article');

        console.log('hi');
        console.log(article);

        return { success: true, article: article };
    }
} satisfies Actions;