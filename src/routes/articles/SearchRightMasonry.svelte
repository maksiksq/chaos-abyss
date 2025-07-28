<script lang="ts">
    import SearchSummaries from "./SearchSummaries.svelte";
    import {onMount} from "svelte";

    let {categories, mobile} = $props();

    let cardsWrap: HTMLElement | undefined = $state();
    let cards: HTMLElement | undefined = $state();

    let cardsTop: number;

    onMount(() => {
        if (!cards) return;
        cardsTop = cards.offsetTop;
    })

    const handleScroll = () => {
        if (mobile) return;
        if (!cards) return;

        const cardsBottom = cards.offsetTop + cards.offsetHeight;
        const bottomScroll = window.scrollY + window.innerHeight;
        const topScroll = window.scrollY;

        window.requestAnimationFrame(() => {
            if (!cards) return;
            if (!cardsWrap) return;

            if (bottomScroll > cardsBottom) {
                cards.style.position = 'fixed';
                cards.style.width = `${cardsWrap.offsetWidth}px`;
                cards.style.left = `${cardsWrap.getBoundingClientRect().left}px`;
                cards.style.top = ``;
                cards.style.bottom = '0';
            }
            if (topScroll < cardsTop) {
                const topOffset = cards.getBoundingClientRect().top;

                cards.style.position = '';
                cards.style.width = '';
                cards.style.left = '';
                cards.style.top = `${topOffset}px`;
                cards.style.bottom = '';
            }
        })
    }

    const capitalize = (s: string) => s.replace(/\b\w/g, (c: string) => c.toUpperCase());
</script>

<svelte:window onscroll={handleScroll}/>

<section class="feat-seg">
    <h2> Here, pick an article: </h2>
    <div class="cards-wrap" bind:this={cardsWrap}>
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
</section>

<style>
    .feat-seg {
        width: 60%;
        display: flex;
        flex-direction: column;

        @media (max-width: 768px) {
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

            @media (max-width: 768px) {
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

                    @media (max-width: 768px) {
                        padding: 0 1rem 0.3rem 1rem;
                    }
                }
            }
        }
    }
</style>