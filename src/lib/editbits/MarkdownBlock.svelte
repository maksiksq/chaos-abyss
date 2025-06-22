<script lang="ts">
    import markdownit from 'markdown-it';
    import mditimgcap from 'markdown-it-image-caption';
    import mdtattr from 'markdown-it-attribution';
    import {onMount, tick} from "svelte";

    const {content} = $props();

    const md = markdownit()
        .use(mditimgcap)
        .use(mdtattr, {
            classNameContainer: 'c-quote',
            classNameAttribution: 'c-quote__attribution',
            removeMarker: true,
        });
    const parsedText = md.render(content.text)

    const makeBlockquoteFullHeight = () => {
        const cQuote = document.getElementsByClassName('c-quote')[0] as HTMLElement;
        console.log(cQuote);
        const above = cQuote?.nextElementSibling;

        if (above && cQuote) {
            const height = above.getBoundingClientRect().height;
            cQuote.style.height = height + 'px';
        }
    }

    onMount(() => {


        tick().then(() => {
            makeBlockquoteFullHeight();
        })
    })
</script>

<p class="article-content">{@html parsedText}</p>

<style>
    :global {
        .c-quote {
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