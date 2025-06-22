<script lang="ts">
    import markdownit from 'markdown-it';
    import mditimgcap from 'markdown-it-image-caption';

    const {content} = $props();

    const md = markdownit().use(mditimgcap);
    const parsedText = md.render(content.text)
</script>

<p class="article-content">{@html parsedText}</p>

<style>
    /* TODO: paragraph style */

    :global {
        .article-content {
            margin: 20px 0 0 0;

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

        }
    }
</style>