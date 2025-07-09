<script lang="ts">
    import SearchSummaries from "./SearchSummaries.svelte";
    import Fuse from "fuse.js";

    let {searchData, fromSearch = false, query = 'Welcome to the Abyss', categoryNames} = $props();

    $inspect('cat', categoryNames)

    if (!searchData && fromSearch) {
        console.warn("Maksiks: No articles loaded into search, you good?");
    }

    type Result = {
        id: number,
        category: string,
        title: string,
        blurb: string,
        figcap?: string,
        figalt: string,
        slug: string,
        contentTrim: string
    }

    type Results = [{
        item: Result,
        refIndex: number
    }]

    let cat = $state();
    let fuse: any;
    if (fromSearch) {
        fuse = new Fuse(searchData, {
            keys: [
                {name: 'title', weight: 0.4},
                {name: 'blurb', weight: 0.2},
                {name: 'category', weight: 0.1},
                {name: 'figcap', weight: 0.03},
                {name: 'figalt', weight: 0.02},
                {name: 'slug', weight: 0.1},
                {name: 'contentTrim', weight: 0.15},
            ], threshold: 0.4
        });
    }

    let results: Results | undefined = $derived(fromSearch ? fuse.search(query) : undefined);

    const sumResults = $derived({
        summaries: results?.map(({item, refIndex}) => ({
            ...item,
            refIndex
        }))
    });
</script>
<section class="search-seg">
    <h1>
        <span class={fromSearch ? '' : 'd-none'}>Results for:&nbsp;</span>
        <span><select>
            <option value="any" selected>Any</option>
            {#each categoryNames as gregory}
                <option value={cat}>{gregory}</option>
            {/each}
        </select></span>
        <br>
        <span class={fromSearch ? 'query-smol' : '' }>{query}</span>
    </h1>
    {#if fromSearch}
        <ul class="search-results">
            <SearchSummaries data={sumResults} {fromSearch} {query}/>
        </ul>
    {:else}
        <small>Try searching something up there, or look at newest articles on the right.</small>
    {/if}
    {#if !results || !fromSearch}
        <div class="lamp-wrap">
            <img class="lamp" src="/img/lamp.svg" alt="a dim lamp (no search results)">
            {#if fromSearch && !results}
                <p>The abyss gave no reply.</p>
            {:else if !fromSearch}
                <p>Nothing in here</p>
            {/if}
        </div>
    {/if}
</section>
<style>
    .query-smol {
        font-size: 1.2rem;
    }

    .search-seg {
        width: 40%;
        padding-right: 1rem;

        & h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        & small {
            font-size: 0.9rem;
        }

        & .lamp-wrap {
            width: 100%;
            height: 70vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            user-select: none;

            & .lamp {
                width: 8rem;
                opacity: 0.6;
            }

            * {
                padding-right: 2rem;
                color: #666666;
            }
        }

        & .search-results {
            display: flex;
            flex-direction: column;
            list-style: none;

            padding-top: 1rem;
        }
    }
</style>