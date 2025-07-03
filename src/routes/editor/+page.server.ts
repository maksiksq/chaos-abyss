import type { Actions } from './$types';
import MarkdownIt from "markdown-it";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import mditimgcap from "@maksiks/markdown-it-image-caption";
import mditattr from "markdown-it-attribution";
import mditanchor from "markdown-it-anchor";
import mditsections from "markdown-it-header-sections";

export const load = async () => {
    const whatever = 'whatever';
    return { whatever };
}

export const actions = {
    newArticle: async ({ request }) => {
        const formData = await request.formData();
        const article = formData.get('article');

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

        const parsedText = md.render(article);

        console.log('hi');
        console.log(article);

        return { success: true, article: parsedText };
    }
} satisfies Actions;