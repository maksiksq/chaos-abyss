<script lang="ts">
    import MarkdownBlock from '$lib/components/MarkdownBlock.svelte';
    import ArticleEndblock from "./ArticleEndblock.svelte";
    import {tick} from "svelte";
    import {error} from "@sveltejs/kit";

    const { data } = $props();

    let body: HTMLBodyElement | undefined = $state();
    const accent = $state(data.article.accent);

    $effect(() => {
        tick().then(() => {
            const match = accent.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/);
            if (!match) {
                console.warn('Maksiks: Invalid accent, default will be used instead.')
                return;
            }
            let [l, c, h] = match.slice(1).map(Number);

            // won't reach 0 anyway but idk maybe I'm feeling spooky
            l = Math.max(0, l-0.0508);
            c = Math.max(0, c+0.0254);
            h = Math.max(0, h);

            const accentDeep = `oklch(${l}, ${c}, ${h})`;

            body?.style.setProperty('--accent-color', accent);
            body?.style.setProperty('--accent-color-deeper', accentDeep);
        });
    })

    const capitalize = (str: string) => str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

    const toISODate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'uhm, the date is wrong';
        }
        return date.toISOString().split("T")[0];
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.article.title,
        "author": {
            "@type": "Person",
            "name": "Maksiks"
        },
        "name": data.article.title,
        "datePublished": toISODate(data.article.date),
        "url": `https://chaos-abyss.com/articles/${data.article.slug}`
    };

    const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(jsonLd)}<${'/'}script>`;
</script>

<svelte:head>
    <title>{capitalize(data.article.title)}</title>
    <meta name="description" content="{data.article.blurb}" />
    <meta property="og:type" content="article">
    <meta property="og:locale" content="en_US">

    <meta property="og:title" content="{capitalize(data.article.title)}">
    <meta property="og:description" content="{data.article.blurb}">
    <meta property="og:url" content={`https://chaos-abyss.com/articles/${data.article.slug}`}>
    <meta property="og:image" content="https://chaos-abyss.com/img/ogimg.png">
<!--    <meta property="og:image" content={`https://chaos-abyss.com/img/${data.article.img}.webp`}>-->

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{capitalize(data.article.title)}">
    <meta name="twitter:description" content="{data.article.blurb}">
    <meta name="twitter:image" content="https://chaos-abyss.com/img/ogimg.png">

    <link rel="canonical" href={`https://chaos-abyss.com/articles/${data.article.slug}`}>
    {@html jsonLdTag}
</svelte:head>

<svelte:body bind:this={body}/>

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
                            <time datetime={data.article.date}>{data.article.date} ✦&nbsp;</time>
                        </p>
                        <address>
                            {data.wordcount}
                            words written by&nbsp;
                            <a rel="author" href={data.authorlink}>
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
                    color: #555555;
                    font-style: italic;
                    align-self: flex-start;
                }
            }
        }
    }
</style>
