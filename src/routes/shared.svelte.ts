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

// Custom inline emotes (surely this doesn't break anything, right?)
const emotesPlugin = (md: MarkdownIt) => {
    const EMOTES: Record<string, string> = {
        idk: "/img/emotes/idk-em.png",
        atou: "https://emoji.slack-edge.com/T0266FRGM/atou-yess/b179ce3517795488.png"
    };

    const RE = /:([a-z0-9_]+):/gi;

    // StateCore type except ts or ide is being weird so any instead
    const emoteReplace = (state: any) => {
        const tokens = state.tokens;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (token.type !== "inline") continue;

            for (let j = 0; j < token.children.length; j++) {
                const child = token.children[j];
                if (child.type !== "text") continue;

                const text = child.content;
                let match;
                let nodes = [];
                let lastIndex = 0;

                while ((match = RE.exec(text)) !== null) {
                    const [full, name] = match;

                    if (match.index > lastIndex) {
                        const t = new state.Token("text", "", 0);
                        t.content = text.slice(lastIndex, match.index);
                        nodes.push(t);
                    }

                    if (EMOTES[name]) {
                        const html = new state.Token("html_inline", "", 0);
                        html.content = `<img src="${EMOTES[name]}" alt=":${name}:" class="emote" role="presentation">`;
                        nodes.push(html);
                    } else {
                        // No emote found, keep original text
                        const t = new state.Token("text", "", 0);
                        t.content = full;
                        nodes.push(t);
                    }

                    lastIndex = match.index + full.length;
                }

                if (lastIndex < text.length) {
                    const t = new state.Token("text", "", 0);
                    t.content = text.slice(lastIndex);
                    nodes.push(t);
                }

                if (nodes.length) {
                    token.children = [
                        ...token.children.slice(0, j),
                        ...nodes,
                        ...token.children.slice(j + 1)
                    ];
                    j += nodes.length - 1;
                }
            }
        }
    }

    md.core.ruler.after("inline", "emotes", emoteReplace);
}

// reparse inside tables, considering it uses pipe characters
// (lazy as heck)
const reparseRubyInsideTables = (md: MarkdownIt) => {
    // One thing for sure I'm not typing that! (right? ... right??(
    const PLACEHOLDER = '⸻';

    // Preventing pipe char inside ruby from breaking table parsing
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
        .use(wrapTablesInDiv)
        .use(emotesPlugin);


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
