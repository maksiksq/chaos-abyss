type Article = {
    slug: string;
    title: string;
    fig: string;
    figcap?: string;
    figalt: string;
    blurb: string;
    date: string;
    author: string;
    authorLink: string;

    content: string;
};

import data from './data.json';

type Articles = Article[];

export const articles: Articles = data;
