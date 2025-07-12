<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import SearchRightMasonry from "./SearchRightMasonry.svelte";
    import SearchLeftSearch from "./SearchLeftSearch.svelte";

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
</script>

<Header/>
<main>
    <SearchLeftSearch
            results={data.results}
            fromSearch={data.fromSearch}
            cat={data.cat}
            query={data.query}
            {categoryNames}
    />
    <SearchRightMasonry {categories}/>
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
    }
</style>