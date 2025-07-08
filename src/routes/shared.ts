type Article = {
    slug: string;
    title: string;
    fig: string;
    figcap?: string;
    figalt: string;
    blurb: string;
    date: string;
    author: string;
    // author link resolved by name
    authorLink: string;
    accent: string;
    content: string;
    // time calculated from word count on client
    time: number;
    commentCount: number;
};

import data from './data.json';
import MarkdownIt from "markdown-it";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import mditimgcap from "@maksiks/markdown-it-image-caption";
import mditanchor from "markdown-it-anchor";

// no types, ide stop bugging me, no i will not feed you more types
// @ts-ignore
import mditattr from "markdown-it-attribution";
// @ts-ignore
import mditsections from "markdown-it-header-sections";

type Articles = Article[];

export const articles: Articles = data;

export const md: MarkdownIt = markdownit({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre><code class="hljs">' +
                        hljs.highlight(str, {language: lang, ignoreIllegals: true}).value +
                        '</code></pre>';
                } catch (__) {
                }
            }

            // auto language if not specified
            try {
                return '<pre><code class="hljs">' +
                    hljs.highlightAuto(str).value +
                    '</code></pre>';
            } catch (__) {
            }

            return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
        },
        html: true,
    })
        .use(mditimgcap)
        .use(mditattr, {
            classNameContainer: 'c-quote',
            classNameAttribution: 'c-quote__attribution',
            removeMarker: true,
        })
        .use(mditanchor)
        .use(mditsections)
;