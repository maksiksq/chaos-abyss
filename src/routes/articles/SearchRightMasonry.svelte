<script lang="ts">
    import SearchSummaries from "./SearchSummaries.svelte";
    import {getBrowserClient} from "$lib/utils/getSupabaseBrowserClient.js";

    let {categories, mobile} = $props();

    let interval = $state(1000);

    let glass = $state(0);
    let cards = $state<HTMLElement | null>(null)

    // pagination
    // duplicated on the server
    const CATEGORY_LIMITS: Record<string, number> = {
        projects: 3,
        miscellaneous: 4,
        japanese: 2,
        media: 3,
        dev: 3
    };

    const DEFAULT_LIMIT = 3;

    let localCategories = $state(categories.map((c: typeof categories[number]) => ({...c, page: 0})));

    const requestNewCatPage = async (cat: string, page: number) => {
        const supabase = getBrowserClient();

        const pageLimit = CATEGORY_LIMITS[cat] ?? DEFAULT_LIMIT
        const from = (page - 1) * pageLimit;
        const to = from + pageLimit - 1;

        const {data: category, error} = await supabase
            .from('articles')
            .select('category, slug, title, fig, figalt, blurb, date, comment_count')
            .eq('category', cat)
            .order('date', {ascending: false})
            .range(from, to)

        if (error || !category) {
            console.error(error);
            return;
        }

        localCategories = localCategories.map((c: typeof localCategories[number]) => {
            if (c.category === cat) {
                return {
                    ...c,
                    summaries: category,
                    page
                };
            }
            return c;
        });
    }

    // this thing makes the background change
    const handleScroll = () => {
        if (!cards) return;

        const scroll = window.scrollY + window.innerHeight;

        // WARNING: kinda arbitrary desktop only number
        // the 4 rem of the header and 2 rem of the heading + sum extra and subtract that from the interval
        const HEADER_OFFSET = 60;
        const MAX_GLASS = 5;

        const cardsHeight = cards.offsetHeight-HEADER_OFFSET;

        if (scroll < cardsHeight) {
            glass = 0;
            interval = cardsHeight;
            return;
        }

        interval = 180;


        glass = Math.floor((scroll-cardsHeight)/(interval));

        if (glass>MAX_GLASS) glass = MAX_GLASS;
    }
</script>

<svelte:window onscroll={handleScroll} onresize={handleScroll}/>

<section class="feat-seg">
    <h2> Here, pick an article: </h2>
    <div class="cards-wrap">
        <div class="cards" bind:this={cards}>
            {#each localCategories as category (category.db)}
                <div class="card">
                    <h3>{category.human}</h3>
                    <ul class="search-summaries">
                        <SearchSummaries data={category} {mobile}/>
                    </ul>
                    <div class="pages">

                        <!-- TODO: Here -->
                        <button onclick={() => category.page -= 1} style={category.summaries.length > 2 ? 'color: #191919;' : 'color: #666666; cursor: initial;'}>&lt;</button>
                        <p>1/1</p>
                        <button style={category.summaries.length > 2 ? 'color: #191919' : 'color: #666666; cursor: initial;'}>&gt;</button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="glass-background">
        <img src={`/img/glass/glass${glass}.svg`} style={glass ? `width: ${40+glass*10}%` : ''} alt="interesting background"/>
    </div>
</section>

<style>
    :global {
        .search-summaries {
            & li:last-child {
                & article {
                    & a {
                        margin-bottom: 0.7rem;
                    }
                }
            }
        }
    }

    .pages {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 0.4rem;
        padding-right: 1rem;

        font-size: 0.9rem;
        font-family: monospace;
        font-weight: bold;

        button {
            all: unset;
            cursor: pointer;
            display: inline-block;
        }

        button:nth-child(2) {
            padding: 0.2rem 0.6rem 0.2rem 0.1rem;
        }

        button:nth-child(1) {
            padding: 0.2rem 0.1rem 0.2rem 0.6rem;
        }

        p {
            color: #191919;
            display: inline-block;
            font-family: monospace;
            padding: 0.2rem 0.1rem;
            font-weight: bold;
        }
    }

    .glass-background {
        position: fixed;
        z-index: -1;
        width: 60%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        & img {
            /*fallback*/
            width: 50%;
            max-width: 100%;
        }
    }

    .feat-seg {
        width: 100%;
        display: flex;
        flex-direction: column;

        @media (max-width: 1023px) {
            width: 100%;
            box-sizing: border-box;
            padding: 0.2rem;
        }

        & h2 {
            margin-bottom: 1rem;
        }

        & .cards {
            width: 100%;
            gap: 1rem;
            columns: 2;
            padding-bottom: 10px;

            @media (max-width: 1023px) {
                columns: 1;
                gap: 0.4rem;
            }

            & .card {
                break-inside: avoid;
                box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
                background-color: white;
                border-radius: 4px;

                margin-bottom: 0.6rem;

                & h3 {
                    padding: 1rem;
                    border-bottom: 1px solid black;
                }

                & ul {
                    padding: 1rem 1rem 0 1rem;
                    list-style: none;

                    @media (max-width: 1023px) {
                        padding: 0 1rem 0.3rem 1rem;
                    }
                }
            }
        }
    }
</style>