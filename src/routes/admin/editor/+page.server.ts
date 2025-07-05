import type {Actions} from '../../../../.svelte-kit/types/src/routes';
import {fail} from "@sveltejs/kit";
import {readFileSync, writeFileSync} from 'fs';
import {md} from "../../shared";


export const load = async () => {
}

export const actions = {
    newArticle: async ({ request }) => {
        const formData = await request.formData();
        const raw = formData.get('article');

        if (!raw || typeof raw !== 'string') {
            return fail(400, { raw, missing: true });
        }

        const parsedHtml = md.render(raw);

        const data = JSON.parse(readFileSync('./src/routes/data.json', 'utf8'));

        data.push(
            {
                slug: 'editormade3',
                title: 'THIS IS NOT THE ARTICLE YOU\'RE LOOKING FOR',
                fig: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200',
                figcap: 'non',
                figalt: 'a really cool cat',
                blurb: 'may the force be meow you',
                date: '2025-06-20',
                author: 'Meeeeeeeeeeee',
                authorLink: '#',

                content: parsedHtml,
            }
        );

        writeFileSync('./src/routes/data.json', JSON.stringify(data, null, 2));

        return { success: true, article: parsedHtml };
    }
} satisfies Actions;