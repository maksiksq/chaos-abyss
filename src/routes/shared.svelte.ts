import type MarkdownIt from "markdown-it";
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

// reparse inside tables, considering it uses pipe characters
// (lazy as heck)
const reparseRubyInsideTables = (md: MarkdownIt) => {
    // One thing for sure I'm not typing that! (right? ... right??(
    const PLACEHOLDER = '⸻';

    // Preventing pipe inside ruby from breaking table parsing
    md.core.ruler.before('block', 'preprocess-ruby', (state) => {
        state.src = state.src.replace(
            /\{([^{}|]+)\|([^{}|]+)}/g,
            (_: string, rb: string, rt: string) => `{${rb}${PLACEHOLDER}${rt}}`
        );
    });

    // Restoring pipe and reparsing only affected inline tokens
    md.core.ruler.after('inline', 'reparse-ruby-inline', (state) => {
        const tokens = state.tokens;

        for (const token of tokens) {
            if (token.type !== 'inline') continue;

            // Only re-tokenize if there's a placeholder
            if (!token.content.includes(PLACEHOLDER)) continue;

            const restored = token.content.replaceAll(PLACEHOLDER, '|');

            token.children = [];
            state.md.inline.parse(
                restored,
                state.md,
                state.env,
                token.children
            );
            token.content = restored;
        }
    });
};

// Plugin to wrap tables in a div, so I can make them responsive properly
const wrapTablesInDiv = (md: MarkdownIt) => {
    md.core.ruler.after('block', 'wrap-tables', (state) => {
        const tokens = state.tokens;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (token.type === 'table_open') {
                const openDiv = new state.Token('html_block', '', 0);
                openDiv.content = '<div class="table-wrap">';
                openDiv.block = true;

                const closeDiv = new state.Token('html_block', '', 0);
                closeDiv.content = '</div>';
                closeDiv.block = true;

                // Insert opening div before table_open
                tokens.splice(i, 0, openDiv);
                i += 1;

                // Find corresponding table_close and insert closing div after it
                while (i < tokens.length) {
                    if (tokens[i].type === 'table_close') {
                        tokens.splice(i + 1, 0, closeDiv);
                        break;
                    }
                    i++;
                }
            }
        }
    });
};



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
        })
        .use(reparseRubyInsideTables)
        .use(wrapTablesInDiv);


type CurrentDetails = {
    uuid: string,
    title: string,
    blurb: string,
    metadesc: string,
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

export let currentDetails: { details: CurrentDetails } | { details: null } = $state({ details: null});
export let currentContent: { content: string } | { content: null } = $state({ content: null});
export let currentDate: { date: string } | { date: null } = $state({ date: null});
