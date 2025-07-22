<script lang="ts">
    import MarkdownBlock from '$lib/components/MarkdownBlock.svelte';
    import ArticleEndblock from "./ArticleEndblock.svelte";
    import {tick} from "svelte";
    import {timestamptzToHumanDate} from "$lib/utils/timestamptzToHumanDate";

    const { data } = $props();

    let body: HTMLBodyElement | undefined = $state();

    $effect(() => {
        const accent = data.article.accent;
        tick().then(() => {
            body?.style.setProperty('--accent-color', data.article.accent);
            body?.style.setProperty('--accent-color-deeper', data.accentDeep);
        });
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
                    <header class="metablock">
                        <h1>
                            <span>{data.article.title}</span>
                        </h1>

                        <small class="blurb"><span>{data.article.blurb}</span></small>
                        <footer>
                            <div class="databloc">
                                <time datetime={timestamptzToHumanDate(data.article.date)}>{timestamptzToHumanDate(data.article.date)} {data.article.last_edit ? `| upd. ${timestamptzToHumanDate(data.article.last_edit)}` : ''} ✦&nbsp;</time>
                                <address>
                                    <p>
                                        {data.wordcount}
                                        words written by
                                    </p>
                                    <a rel="author" href={data.authorlink}>
                                        {data.article.author}
                                    </a>
                                </address>
                            </div>
                        </footer>
                    </header>

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

                & header {
                    padding-top: clamp(0.5rem, 1.2vw, 2rem);

                    width: 100%;
                    display: flex;
                    flex-direction: column;

                    & h1 {
                        & span {
                            padding: 5px 5px 0 5px;
                            background-color: var(--accent-color);
                            display: inline;
                            box-decoration-break: clone;

                            font-size: 2.6rem;
                            line-height: 2.9rem;

                            font-weight: bolder;
                            font-family: 'Karla', sans-serif;

                            @media (max-width: 768px) {
                                font-size: 1.6rem;
                                line-height: 2.5rem;
                            }
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

                            @media (max-width: 768px) {
                                font-size: 1.1rem;
                            }
                        }
                    }

                    & footer {
                        display: flex;
                        flex-direction: row;
                        align-items: center;

                        padding: 5px;
                        background-color: color-mix(in hsl, var(--accent-color) 93%, black);
                        font-weight: bolder;

                        @media (max-width: 768px) {
                            font-size: 1rem;
                            margin-top: 0.3rem;
                        }

                        & .databloc {
                            width: 100%;

                            & time {
                                font-family: 'Anonymous Pro', sans-serif;
                            }

                            & address {
                                display: inline;

                                font-family: 'Anonymous Pro', sans-serif;
                                font-style: normal;

                                & * {
                                    display: inline;
                                    font-family: 'Anonymous Pro', sans-serif;
                                    font-style: normal;
                                }

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
