<script lang="ts">
    import markdownit from 'markdown-it';
    import MarkdownIt from "markdown-it";
    import mditimgcap from '@maksiks/markdown-it-image-caption';
    import mdtattr from 'markdown-it-attribution';
    import mdtanchor from 'markdown-it-anchor';

    import hljs from 'highlight.js';

    import {onDestroy, onMount, tick} from "svelte";

    const {content} = $props();

    // TODO: move to server side
    const md: MarkdownIt = markdownit({
            highlight: function (str, lang) {
                console.log('[Highlight.js] lang =', lang);
                console.log('Languages available:', hljs.listLanguages());

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
            .use(mdtattr, {
                classNameContainer: 'c-quote',
                classNameAttribution: 'c-quote__attribution',
                removeMarker: true,
            })
            .use(mdtanchor)
    ;

    const parsedText = md.render(content.text)

    $inspect(parsedText, {})

    let quotes: NodeListOf<HTMLQuoteElement>;
    let quote: HTMLElement;
    let below: HTMLElement;
    let parentElem: HTMLElement;

    const makeBlockquoteFullHeight = () => {
        if (below && quote) {
            const height = below.getBoundingClientRect().height;
            quote.style.height = height + 'px';
        }
    }

    let observer: ResizeObserver;

    const observeQuotes = (quotes: NodeListOf<HTMLQuoteElement>) => {
        quotes.forEach(currentQuote => {
            quote = currentQuote;
            below = quote?.nextElementSibling as HTMLElement;
            if (!below) {
                console.warn("Maksiks: A blockquote is not supposed to exist without an element after it. Likely just move the '>' 1 line back.")
                return;
            }
            parentElem = quote?.parentElement as HTMLElement;

            if (parentElem.classList.contains('c-quote')) {
                return;
            }

            makeBlockquoteFullHeight();


            observer.observe(below);
        })
    }

    onMount(() => {
        tick().then(() => {
            observer = new ResizeObserver(makeBlockquoteFullHeight)

            // normal quotes
            quotes = document.querySelectorAll('blockquote');
            observeQuotes(quotes);

            // cquotes
            quotes = document.querySelectorAll('.c-quote');
            observeQuotes(quotes);
        })

    })
    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
    })
</script>

<!-- no user submitted + it's sanitized, so whatever -->
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<p class="article-content">{@html parsedText}</p>

<style>
    :global {
        .c-quote {
            max-width: 40%;
            margin: 0 !important;
            padding: 0 0 0 clamp(10px, 1.5vw, 35px);
            float: right;
            text-transform: uppercase;

            background: linear-gradient(135deg, color-mix(in oklab, var(--accent-color) 99%, black), color-mix(in oklab, var(--accent-color) 30%, black));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 1.2rem;

            & blockquote {
                all: unset;
            }
        }

        blockquote {
            max-width: 40%;
            margin: 0 !important;

            background: linear-gradient(135deg, color-mix(in oklab, var(--accent-color) 99%, black), color-mix(in oklab, var(--accent-color) 30%, black));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 1.2rem;

            padding: 0 0 0 clamp(10px, 1.5vw, 35px);
            text-transform: uppercase;

            display: flex;
            align-items: center;

            float: right;
        }

        .article-content {
            margin: 20px 0 0 0;
            line-height: 2;

            & figure {
                margin: 20px 0 20px 0;

                align-items: center;
                display: flex;
                flex-direction: column;
                justify-content: center;

                & img {
                    max-width: 100%;
                }
            }

            & table {
                width: 100%;

                margin: 1vw 0 1vw 0;
                border-spacing: 0;

                & td, tr, th {
                    padding: 10px;
                    border: 1px solid black;
                }

                border: 1px solid black;
            }

            & a {
                text-decoration: underline;
                cursor: pointer;
            }

            & pre {
                background-color: #fefcff;
                line-height: 1.2rem;
                letter-spacing: -0.022em;
                border: 1px solid #e3e3e3;

                border-radius: 4px;
                padding: 0 20px;

                & code {
                    & * {
                        font-family: "JetBrains Mono", monospace;
                    }

                    padding: 1px 6px;
                    font-family: "JetBrains Mono", monospace;
                    font-weight: bold;
                    font-size: 0.87rem;
                    background: transparent;
                }
            }

            & code {
                font-family: "JetBrains Mono", monospace;
                padding: 1px 6px;
                font-size: 0.87rem;
                border-radius: 4px;
                background-color: #eaeaea;
            }
        }
    }
</style>