<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import SearchRightMasonry from "./SearchRightMasonry.svelte";
    import SearchLeftSearch from "./SearchLeftSearch.svelte";
    import {onMount} from "svelte";

    type Summary = typeof data.summaries[number];

    let {data} = $props();

    const grouped: Record<string, Summary[]> = data.summaries.reduce((acc: Record<string, Summary[]>, summary: Summary) => {
        if (!acc[summary.category]) {
            acc[summary.category] = [];
        }
        acc[summary.category].push(summary);
        return acc;
    }, {})

    const order = ['japanese', 'miscellaneous', 'projects', 'media', 'dev'];

    const capitalize = (s: string) =>
        s.replace(/\b\w/g, (c: string) => c.toUpperCase());

    let categoryNames = $state([
        ...Object.keys(grouped).map((name) => ({
            db: name,
            human: capitalize(name === 'media' ? 'Games & Media' : name)
        })),
        {db: "any", human: "Any"}
    ]);

    categoryNames = categoryNames.sort((a, b) => {
        const indexA = order.indexOf(a.db);
        const indexB = order.indexOf(b.db);
        return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
    });

    const categories = $state(Object.entries(grouped).map(([name, summaries]) => {
        const names = categoryNames.find(n => n.db === name);
        return {
            name,
            summaries,
            ...names
        };

    }));

    const sortedCategories = $state(categories.sort((a, b) => {
        const indexA = order.indexOf(a.db ?? '');
        const indexB = order.indexOf(b.db ?? '');
        return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
    }));

    // Dev Stuff
    // Japanese
    // Games & Media
    // Project Stash
    // Miscellaneous
    // Later ? Design
    // Later ? Electronics

    let mobile = $state(false);
    const checkIfMobile = () => {
        mobile = window.matchMedia('(max-width: 1023px)').matches;
    }
    let mobileSearch = $state(data.fromSearch);
    let mobileSearchDerived = $derived(mobile ? (mobileSearch ? 'yes' : 'no') : 'desktop');
    $effect(() => {
        data.results ? mobileSearch = true : '';
    })

    onMount(() => {
        checkIfMobile();
    })
</script>

<svelte:window onload={checkIfMobile} onresize={checkIfMobile}/>

<Header/>
<main>
    <section class="mobile-switcher">
        <button onclick={() => {mobileSearch = false}} style={mobileSearch ? '' : 'color: black'}>Newest Articles
        </button>
        <button onclick={() => {mobileSearch = true}} style={mobileSearch ? "color: black" : ''}>Search</button>
    </section>

    <noscript>
        <div class={`search-left-search  noscript-mobile`}>
            <SearchLeftSearch
                    results={data.results}
                    searchCount={data.searchCount}
                    fromSearch={data.fromSearch}
                    cat={data.cat}
                    query={data.query}
                    noResultsTxt={data.noResultsTxt}
                    {categoryNames}
                    {mobile}
            />
        </div>
        <div class={`search-right-masonry  noscript-mobile`}>
            <SearchRightMasonry categories={sortedCategories} categoryPages={data.categoryPages} {mobile}/>
        </div>
    </noscript>
    <div class={`search-left-search mobile-none ${mobileSearchDerived === 'yes' ? 'mobile-block' : ''}`}>
        <SearchLeftSearch
                results={data.results}
                searchCount={data.searchCount}
                fromSearch={data.fromSearch}
                cat={data.cat}
                query={data.query}
                noResultsTxt={data.noResultsTxt}
                {categoryNames}
                {mobile}
        />
    </div>
    <div class={`search-right-masonry ${mobileSearchDerived === 'no' ? '' : 'mobile-none'}`}>
        <SearchRightMasonry categories={sortedCategories} categoryPages={data.categoryPages} {mobile}/>
    </div>
</main>
<style>
    .noscript-mobile {
        display: none;
    }

    @media (max-width: 1023px) {
        .mobile-none {
            display: none;
        }

        .noscript-mobile {
            display: block;
        }

        .mobile-block {
            display: block;
        }
    }

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

        min-height: 130vh;

        @media (max-width: 1023px) {
            flex-direction: column;
            min-height: 1vh;
            height: 100%;
        }

        & .search-left-search {
            width: 40%;
            padding-right: 1rem;

            @media (max-width: 1023px) {
                width: 100%;
            }
        }

        & .search-right-masonry {
            width: 60%;

            @media (max-width: 1023px) {
                width: 100%;
            }
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
                font-size: 0.8rem;
                padding-right: 1rem;
            }
        }
    }
</style>