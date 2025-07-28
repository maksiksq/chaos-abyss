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

    const capitalize = (s: string) => s.replace(/\b\w/g, (c: string) => c.toUpperCase());

    let categoryNames = [...categories.map((category) => ({
        db: category.name,
        human: capitalize(category.name === 'media' ? 'Games & Media' : category.name)
    })), {db: "any", human: "Any"}];

    // Dev Stuff
    // Japanese
    // Games & Media
    // Project Stash
    // Miscellaneous
    // Later ? Design
    // Later ? Electronics

    let mobile = $state();
    const checkIfMobile = () => {
        mobile = window.matchMedia('(max-width: 1023px)').matches;
    }
    let mobileSearch = $state(data.fromSearch);
    let mobileSearchDerived = $derived(mobile ? (mobileSearch ? 'yes' : 'no')  : 'desktop');
    $effect(() => {data.results ? mobileSearch = true : ''})

    onMount(() => {
        checkIfMobile();
    })
 </script>

<svelte:window onload={checkIfMobile} onresize={checkIfMobile} />

<Header/>
<main>
    <section class="mobile-switcher">
        <button onclick={() => {mobileSearch = false}} style={mobileSearch ? '' : 'color: black'}>Newest Articles</button>
        <button onclick={() => {mobileSearch = true}} style={mobileSearch ? "color: black" : ''}>Search</button>
    </section>
    {#if mobileSearchDerived === 'desktop' || mobileSearchDerived === 'yes'}
        <SearchLeftSearch
                results={data.results}
                searchCount={data.searchCount}
                fromSearch={data.fromSearch}
                cat={data.cat}
                query={data.query}
                noResultsTxt={data.noResultsTxt}
                {categoryNames}
        />
    {/if}
    {#if mobileSearchDerived === 'desktop' || mobileSearchDerived === 'no'}
    <SearchRightMasonry {categories} {mobile}/>
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

        @media (max-width: 1023px) {
            flex-direction: column;
            min-height: 1vh;
            height: 100%;
        }

        & .mobile-switcher {
            align-self: flex-end;
            display: flex;
            justify-content: flex-end;
            width: 60%;
            padding: 1rem 0;
            color: #666666;
            border-bottom: 1px solid black;
            transition: color 0.2s;

            @media (min-width: 1023px) {
                display: none;
            }

            & button {
                all: unset;
                font-size: 0.8rem;padding-right: 1rem;
            }
        }
    }
</style>