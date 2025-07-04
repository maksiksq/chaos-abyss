<script lang="ts">
    import MarkdownBlock from '$lib/components/ArticleInner/MarkdownBlock.svelte';
    import ArticleEndblock from "$lib/components/ArticleInner/ArticleEndblock.svelte";

    const { data } = $props();

    const dateObj = new Date(data.article.date);
    const humanDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });

    // TODO: word count
    const wordCount = 4500;

    // don't forget meta-tags or else
</script>

{#key data}
    {#if data.article}
        <main>
            <article>
                <figure>
                    <img src="{data.article.fig}" alt="{data.article.figalt}">
                    {#if (data.article.figcap)}
                        <figcaption>{data.article.figcap}</figcaption>
                    {/if}
                </figure>

                <header class="metablock">
                    <h1>
                        <span>{data.article.title}</span>
                    </h1>

                    <small class="blurb"><span>{data.article.blurb}</span></small>
                    <footer>
                        <p>
                            <time datetime={data.article.date}>{humanDate} ✦&nbsp;</time>
                        </p>
                        <address>
                            {wordCount}
                            words written by&nbsp;
                            <a rel="author" href={data.article.authorLink}>
                                {data.article.author}
                            </a>
                        </address>
                    </footer>
                </header>

                <MarkdownBlock content={data.article.content}/>
                <ArticleEndblock adjacent={data.adjacent}/>
            </article>
        </main>
        <!-- imagine a comment section here -->
    {/if}
{/key}

<style>
    main {
        & article {
            max-width: 1000px;
            width: 100%;
            padding-top: clamp(0.5rem, 1.2vw, 3rem);
            margin: 0 auto;

            & header {
                padding-top: clamp(0.5rem, 1.2vw, 2rem);

                width: 100%;
                display: flex;
                flex-direction: column;

                & h1 {
                    & span {
                        text-transform: capitalize;
                        padding: 5px 5px 0 5px;
                        background-color: var(--accent-color);
                        display: inline;
                        box-decoration-break: clone;

                        font-size: 2.6rem;
                        line-height: 2.9rem;

                        font-weight: bolder;
                        font-family: 'Karla', sans-serif;
                    }
                }

                & .blurb {
                    & span {
                        padding: 5px;
                        background-color: var(--accent-color);
                        display: inline-block;
                        font-size: 1.3rem;

                        font-family: 'Anonymous Pro', sans-serif;
                        font-weight: bolder;
                    }
                }

                & footer {
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    padding: 5px;
                    background-color: color-mix(in hsl, var(--accent-color) 93%, black);
                    font-weight: bolder;

                    & p {
                        & time {
                            font-family: 'Anonymous Pro', sans-serif;
                        }
                    }

                    & address {
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;

                        font-family: 'Anonymous Pro', sans-serif;
                        font-style: normal;

                        & a {
                            cursor: pointer;

                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
