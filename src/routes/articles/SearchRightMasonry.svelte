<script lang="ts">
    import SearchSummaries from "./SearchSummaries.svelte";
    import {onMount} from "svelte";

    let {categories} = $props();

    const capitalize = (s: string) => s.replace(/\b\w/g, (c: string) => c.toUpperCase());

    let interval = $state(1000);

    let glass = $state(0);
    let cards = $state<HTMLElement | null>(null)

    // this thing makes the background change
    const handleScroll = () => {
        if (!cards) return;

        const scroll = window.scrollY + window.innerHeight;

        // he 4 rem of the header and 2 rem of the heading + sum extra and account for the interval
        const cardsHeight = cards.offsetHeight-60;

        if (scroll < cardsHeight) {
            glass = 0;
            return;
        }

        if (scroll < cardsHeight) {
            interval = cardsHeight;
        } else {
            interval = 200;
        }

        glass = Math.floor((scroll-cardsHeight)/(interval));

        if (glass>5) glass = 5;
    }
</script>

<svelte:window onscroll={handleScroll} onresize={handleScroll}/>

<section class="feat-seg">
    <h2> Here, pick an article: </h2>
    <div class="cards-wrap">
        <div class="cards" bind:this={cards}>
            {#each categories as category}
                <div class="card">
                    <h3>{capitalize(category.name)}</h3>
                    <ul>
                        <SearchSummaries data={category}/>
                    </ul>
                </div>
            {/each}
        </div>
    </div>
    <div class="glass-background">
        <img src={`/img/glass/glass${glass}.svg`} style={glass ? `width: ${40+glass*10}%` : ''} alt="interesting background"/>
    </div>
</section>

<style>
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
        width: 60%;
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
                    padding: 1rem 1rem 0.3rem 1rem;
                    list-style: none;

                    @media (max-width: 1023px) {
                        padding: 0 1rem 0.3rem 1rem;
                    }
                }
            }
        }
    }
</style>