<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";

    let {data} = $props();
    let fromSearch = $state(false);
    let query = $state('Welcome to the Abyss');

    type FeatArticle = {
        title: string;
        img: string;
        blurb: string;
        slug: string;
    }
    type Feats = {
        name: string;
        summaries: FeatArticle[]
    }[];

    // Dev Stuff
    // Japanese
    // Games & Media
    // Project Stash
    // Miscellaneous
    // Later ? Design
    // Later ? Electronics

    const feats: Feats = [
        {
            "name": "Dev Stuff",
            "summaries": [{
                "title": "Svelte is cool",
                "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM9LIHmk15RXVCqduQP_MZ4dzjZhqvvXJahw&s",
                "blurb": "yeet theee cat",
                "slug": "example"
            }, {
                "title": "Svelte is the best thing ever",
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/SuitDiamonds.svg/180px-SuitDiamonds.svg.png",
                "blurb": "summon thee developer",
                "slug": "example"
            }]
        },
        {
            "name": "Japanese",
            "summaries": [{
                "title": "How i found out about the word for Beans in Japanese.",
                "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM9LIHmk15RXVCqduQP_MZ4dzjZhqvvXJahw&s",
                "blurb": "yeet the cat",
                "slug": "example"
            }, {
                "title": "How i found out about the word for Wallpapers in Japanese.",
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/SuitDiamonds.svg/180px-SuitDiamonds.svg.png",
                "blurb": "summon the developer",
                "slug": "example"
            }]
        },
        {
            "name": "Games & Media",
            "summaries": [{
                "title": "Hades is poggers",
                "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM9LIHmk15RXVCqduQP_MZ4dzjZhqvvXJahw&s",
                "blurb": "yeet theee cat",
                "slug": "example"
            }, {
                "title": "OneShot is also cool",
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/SuitDiamonds.svg/180px-SuitDiamonds.svg.png",
                "blurb": "summon theeeeeee developer",
                "slug": "example"
            }]
        },
        {
            "name": "Project Stash",
            "summaries": [{
                "title": "Lirith is cool",
                "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM9LIHmk15RXVCqduQP_MZ4dzjZhqvvXJahw&s",
                "blurb": "yeet theee cat",
                "slug": "example"
            }, {
                "title": "Lirith is not yet a thing",
                "img": "https://b-w-kitty-maksiksed.vercel.app/static/media/pic.4387a5b982e94311f550.png",
                "blurb": "summon thee developer",
                "slug": "example"
            }]
        },
        {
            "name": "Miscellaneous",
            "summaries": [{
                "title": "Hades is poggers",
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/SuitDiamonds.svg/180px-SuitDiamonds.svg.png",
                "blurb": "yeet theee cat",
                "slug": "example"
            }, {
                "title": "OneShot is also cool",
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/SuitDiamonds.svg/180px-SuitDiamonds.svg.png",
                "blurb": "summon theeeeeee developer",
                "slug": "example"
            }]
        }
    ]
</script>

<Header/>
<main>
    <section class="search-seg">
        <h1><span class={!fromSearch ? 'd-none' : ''}>Results for:</span>{query}</h1>
        <small>try searching something up or look at newest articles on the right.</small>
    </section>
    <section class="feat-seg">
        <p> here, pick a slug: </p>
        <div class="cards">
            {#each feats as feat}
                <div class="card">
                    <h2>{feat.name}</h2>
                    <ul>
                        {#each feat.summaries as summary}
                            <li>
                                <article>
                                    <a href={`articles/${summary.slug}`}>
                                        <img src={summary.img} alt="article summary pic" role="presentation"/>
                                        <h3>{summary.title}</h3>
                                        <p>{summary.blurb}</p>
                                    </a>
                                </article>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
        <!--        <ul>-->
        <!--            &lt;!&ndash;{#each data.summaries as {slug, title}}&ndash;&gt;-->
        <!--            &lt;!&ndash;    <li><a href="/articles/{slug}">{title}</a></li>&ndash;&gt;-->
        <!--            &lt;!&ndash;{/each}&ndash;&gt;-->
        <!--        </ul>-->
    </section>
</main>

<Footer/>
<style>
    :global {
        body {
            overflow-y: visible;
        }
    }

    main {
        display: flex;
        flex-direction: row;
        justify-content: center;

        max-width: 1000px;
        width: 100%;
        padding-top: clamp(0.5rem, 1.2vw, 3rem);
        margin: 0 auto;
        background: yellow;

        min-height: 200vh;

        & .search-seg {
            width: 40%;
        }

        & .feat-seg {
            width: 60%;
            display: flex;
            flex-direction: column;

            & .cards {
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-auto-flow: dense;
                grid-auto-rows: 10px;
                gap: 1rem;

                & .card {
                    min-height: 1000px;

                    * {
                        max-width: 100%;
                    }
                }
            }
        }
    }
</style>