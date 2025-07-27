import MarkdownIt from "markdown-it";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import mditimgcap from "@maksiks/markdown-it-image-caption";
import mditanchor from "markdown-it-anchor";
import mditlinkattrs from 'markdown-it-link-attributes';
import mditmathjax from 'markdown-it-mathjax3';

// no types, ide stop bugging me, no i will not feed you more types
// you got all your types for the week in advance.
// @ts-ignore
import mditattr from "markdown-it-attribution";
// @ts-ignore
import mditsections from "markdown-it-header-sections";
// @ts-ignore
import mditrubyplugin from 'markdown-it-ruby';

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
        .use(mditrubyplugin)
        .use(mditmathjax)
        .use(mditlinkattrs, {
            attrs: {
                target: "_blank",
                rel: "noopener",
            }
        });

type Details = {
    uuid: string,
    title: string,
    blurb: string,
    category: string,
    slug: string,
    fig: string,
    widefig: string,
    figcap: string | null,
    figalt: string,
    accent: string,
    jewel: boolean,
    reminder: string,
    author: string,
}

export let currentDetails: { details: Details } | { details: null } = $state({ details: null});
export let currentContent: { content: string } | { content: null } = $state({ content: null});
export let currentDate: { date: string } | { date: null } = $state({ date: null});