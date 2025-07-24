<script lang="ts">
    import MarkdownBlock from '$lib/components/MarkdownBlock.svelte';
    import ArticleEndblock from "./ArticleEndblock.svelte";
    import MetaBlock from "$lib/components/MetaBlock.svelte";

    const {data} = $props();

    let body: HTMLBodyElement | undefined = $state();

    $effect(() => {
        body?.style.setProperty('--accent-color', data.article.accent);
        body?.style.setProperty('--accent-color-deeper', data.accentDeep);
    })
</script>

<svelte:body bind:this={body}/>

{#key data}
    {#if data.article}
        <main>
            <article>
                <div class="head-fig-wrap">
                    <figure class="head-fig">
                        <img class="widefig" src={data.article.widefig} alt="{data.article.figalt}">
                        <img class="fig" src={data.article.fig} alt="{data.article.figalt}">
                        {#if (data.article.figcap)}
                            <figcaption>{data.article.figcap}</figcaption>
                        {/if}
                    </figure>
                </div>
                <section class="content">
                    <MetaBlock
                            title={data.article.title}
                            blurb={data.article.blurb}
                            date={data.article.date}
                            lastEdit={data.article.last_edit}
                            wordcount={data.wordcount}
                            authorLink={data.authorlink}
                            author={data.article.author}
                    />
                    <MarkdownBlock content={data.article.content}/>
                    <ArticleEndblock adjacent={data.adjacent}/>
                </section>
            </article>
        </main>
        <!-- imagine a comment section here -->
    {/if}
{/key}

<style>
    :global {
        html {
            overflow-y: visible;
        }

        body {
            overflow-y: hidden;
        }
    }

    main {
        & article {
            width: 100%;

            & .head-fig-wrap {
                width: 100%;
                height: auto;
                background-color: var(--accent-color);

                & .head-fig {
                    width: 100%;
                    min-height: 10vh;
                    height: auto;

                    & .widefig {

                        @media (max-width: 767px) {
                            display: none;
                        }
                    }

                    & .fig {
                        @media (min-width: 768px) {
                            display: none;
                        }
                    }
                }
            }

            & .content {
                max-width: 840px;
                padding: 0 2rem;
                box-sizing: border-box;
                width: 100%;
                margin: -10vh auto 0 auto;

                @media (max-width: 768px) {
                    margin: 2vh auto 0 auto;
                    padding: 0 1.4rem;
                }
            }

            & figure {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 0 auto;

                & img {
                    max-width: 100%;
                }

                & figcaption {
                    margin-top: 10px;
                    color: #555555;
                    font-style: italic;
                    align-self: flex-start;
                }
            }
        }
    }
</style>
