<script lang="ts">
    import markdownit from 'markdown-it';
    import mditimgcap from 'markdown-it-image-caption';

    const {content} = $props();

    const md = markdownit().use(mditimgcap);
    const parsedText = md.render(content.text)
</script>

<p class="article-txt">{@html parsedText}</p>

<style>
    /* TODO: paragraph style */

    :global {
        .article-txt {
            & figure {
                max-width: 100%;

                align-items: center;
                display: flex;
                flex-direction: column;
                justify-content: center;

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

        }
    }
</style>