<script lang="ts">
    import markdownit from 'markdown-it';
    import mditimgcap from 'markdown-it-image-caption';
    import mdtattr from 'markdown-it-attribution';
    import {onDestroy, onMount, tick} from "svelte";

    const {content} = $props();

    const md = markdownit()
        .use(mditimgcap)
        .use(mdtattr, {
            classNameContainer: 'c-quote',
            classNameAttribution: 'c-quote__attribution',
            removeMarker: true,
        });
    const parsedText = md.render(content.text)

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

    const goThroughQuotes = (quotes: NodeListOf<HTMLQuoteElement>) => {
        quotes.forEach(currentQuote => {
            quote = currentQuote;
            below = quote?.nextElementSibling as HTMLElement;
            parentElem = quote?.parentElement as HTMLElement;

            if (parentElem.classList.contains('c-quote')) {
                return;
            }

            makeBlockquoteFullHeight();

            const observer = new ResizeObserver(makeBlockquoteFullHeight);
            observer.observe(below);
        })
    }

    onMount(() => {
        tick().then(() => {
            // normal quotes
            quotes = document.querySelectorAll('blockquote');
            goThroughQuotes(quotes);

            // cquotes
            quotes = document.querySelectorAll('.c-quote');
            goThroughQuotes(quotes);

        })
    })
    onDestroy(() => {

    })
</script>

<p class="article-content">{@html parsedText}</p>

<style>
    :global {
        .c-quote {
            max-width: 40%;
            margin: 0 !important;
            padding: 0 0 0 clamp(10px, 1.5vw, 35px);
            float: right;
            text-transform: uppercase;

            blockquote {
                all: unset;
            }
        }

        blockquote {
            max-width: 40%;
            margin: 0 !important;
            padding: 0 5px;
            float: right;
            text-transform: uppercase;
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

                & figcaption {
                    /* cursed */

                    & strong {
                        font-weight: normal;
                    }
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

            & code {
                padding: 1px 6px;
                font-family: "JetBrains Mono", monospace;
                font-size: 0.9rem;
                border-radius: 4px;
                background-color: #e3e3e3;
            }
        }
    }
</style>