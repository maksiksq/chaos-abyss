<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import SearchRightMasonry from "./SearchRightMasonry.svelte";
    import SearchLeftSearch from "./SearchLeftSearch.svelte";
    import {onMount} from "svelte";

    type Summary = {
        category: string;
        slug: string;
        title: string;
        fig: string;
        figalt: string;
        blurb: string;
        date: string;
        commentCount: number;
    }

    let { data } = $props();
    const grouped = data.summaries.reduce((acc: any, summary: Summary) => {
        if (!acc[summary.category]) {
            acc[summary.category] = [];
        }
        acc[summary.category].push(summary);
        return acc;
    }, {})

    const categories = Object.entries(grouped).map(([name, summaries]) => ({
        name,
        summaries
    }));

    let categoryNames = [...categories.map((category) => category.name), "Any"];

    // Dev Stuff
    // Japanese
    // Games & Media
    // Project Stash
    // Miscellaneous
    // Later ? Design
    // Later ? Electronics

    let mobile = $state();
    const checkIfMobile = () => {
        mobile = window.matchMedia('(max-width: 768px)').matches;
    }
    let mobileSearch = $state(false);
    let mobileSearchDerived = $derived(mobile ? (mobileSearch ? 'yes' : 'no')  : 'desktop');

    onMount(() => {
        checkIfMobile();
    })
    $inspect(mobileSearchDerived)
 </script>

<svelte:window onload={checkIfMobile} onresize={checkIfMobile} />

<Header/>
<main>
    <section class="mobile-switcher">
        <button onclick={() => {mobileSearch = false}}>Newest Articles</button>
        <button onclick={() => {mobileSearch = true}}>Search</button>
    </section>
    {#if mobileSearchDerived === 'desktop' || mobileSearchDerived === 'no'}
        <SearchLeftSearch
                results={data.results}
                fromSearch={data.fromSearch}
                cat={data.cat}
                query={data.query}
                {categoryNames}
        />
    {/if}
    {#if mobileSearchDerived === 'desktop' || mobileSearchDerived === 'yes'}
    <SearchRightMasonry {categories}/>
    {/if}
</main>
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

        width: 100vw;
        padding-left: clamp(0.1rem, 1vw, 3vw);
        padding-right: clamp(0.1rem, 2vw, 5vw);
        padding-top: clamp(0.5rem, 1.2vw, 3rem);
        margin: 0 auto;
        box-sizing: border-box;

        min-height: 200vh;

        @media (max-width: 768px) {
            flex-direction: column;
            min-height: 1vh;
            height: 100%;
        }

        & .mobile-switcher {
            @media (min-width: 768px) {
                display: none;
            }
        }
    }
</style>