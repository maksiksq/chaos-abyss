import type { Actions } from './$types';
import MarkdownIt from "markdown-it";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import mditimgcap from "@maksiks/markdown-it-image-caption";
import mditanchor from "markdown-it-anchor";
import {fail} from "@sveltejs/kit";

// no types, ide stop bugging me, no i will not feed you more types
// @ts-ignore
import mditattr from "markdown-it-attribution";
// @ts-ignore
import mditsections from "markdown-it-header-sections";

export const load = async () => {
    const whatever = 'whatever';
    return { whatever };
}

export const actions = {
    newArticle: async ({ request }) => {
        const formData = await request.formData();
        const raw = formData.get('article');

        if (!raw || typeof raw !== 'string') {
            return fail(400, { raw, missing: true });
        }

        const article: string = raw;


        const md: MarkdownIt = markdownit({
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

        const parsedHtml = md.render(article);

        return { success: true, article: parsedHtml };
    }
} satisfies Actions;