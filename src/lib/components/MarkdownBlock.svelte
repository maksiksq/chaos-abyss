<script lang="ts">
    // !!!!!!!!!!!!!!!!!
    // The markdown is handled server side
    // The this page only renders the html gotten from the server
    // !!!!!!!!!!!!!!!!!

    import {onDestroy, onMount, tick} from "svelte";

    const {content} = $props();

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

<p class="article-content">{@html content}</p>

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

            & ul {
                list-style:  none;
            }

            & h2 {
                font-size: 1.7rem;
                line-height: 1.4;
            }

            & h3 {
                font-size: 1.4rem;
                line-height: 1.4;
            }

            & h4 {
                font-size: 1.2rem;
                line-height: 1.4;
            }

            & p {
                line-height: 1.8;
            }

            & figure {
                margin: 20px 0 20px 0;

                align-items: center;
                display: flex;
                flex-direction: column;
                justify-content: center;

                & img {
                    max-width: 80%;
                }
            }

            & img {
                display: block;
                margin-inline: auto;
                max-width: 100%;
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


            & figure {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                & img {
                    max-width: 100%;
                }

                & figcaption {
                    margin-top: 10px;
                    align-self: flex-start;
                }
            }
        }
    }
</style>