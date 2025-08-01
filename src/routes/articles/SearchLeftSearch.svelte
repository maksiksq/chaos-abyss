<script lang="ts">
    import SearchSummaries from "./SearchSummaries.svelte";
    import {goto} from "$app/navigation";

    interface Props {
        results: { summaries: any[] } | null;
        searchCount: number | null,
        fromSearch: boolean | null,
        query: string | null,
        noResultsTxt: string,
        cat: string,
        categoryNames: Array<{
            db: string;
            human: string;
        }>,
        mobile: boolean
    }

    let {
        results = {summaries: []},
        searchCount = null,
        fromSearch = false,
        query = 'Welcome to the Abyss',
        noResultsTxt = 'The abyss gave no reply.',
        cat = "any",
        categoryNames,
        mobile
    }: Props = $props();


    // it must be greg
    // i will not consider your complaints
    let greg = $state(false);
    type CategoryName = { db: string, human: string };

    const categoryNamesAlphabetical = $derived(categoryNames.slice().sort((a, b) => a.human.localeCompare(b.human)));
</script>

<section class="search-seg">
    <div class="head-cont">
        {#if fromSearch}
            <div class="head-cont-up">
                <div class="head-results">
                    <h1>Results for:&nbsp; <span class="query-smol">{query}</span></h1>
                    <p class="search-count {searchCount ? '' : 'search-count-disappear' }">
                        {#if searchCount}
                            {searchCount} results found
                        {:else}
                            no results
                        {/if}
                    </p>
                </div>
                <div class="head-item cat-dropdown-cont">
                    <!-- Games & Media is stored as media in the db because of url, thus the array of objects -->
                    <!-- Also onblur might cause minor jank once in a blood moon -->
                    <button aria-label="Select category" onclick={() => {greg = !greg;}}
                            onblur={() => {setTimeout(() => {greg = false;}, 200)}} class="cat-dropdown-toggle">
                        Category: <br><span
                            class="cat">{categoryNames.find((c: CategoryName) => c.db === cat)?.human ?? "Unknown"}</span>
                    </button>
                    {#if greg}
                        <div class="cat-dropdown-menu">
                            {#each (categoryNamesAlphabetical ?? categoryNames) as gregory (gregory.db)}
                                <button class={(gregory.db !== cat) ? '' : 'greyed-out'} onclick={(gregory.db !== cat) ? () => {goto(`/articles?query=${query}&category=${gregory.db}`)} : () => {}}>{gregory.human}</button>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <h1 class="head-main">Welcome to the Abyss</h1>
        {/if}
    </div>
    {#if fromSearch && results}
        <ul class="search-results">
            <SearchSummaries data={results} {fromSearch} {mobile}/>
        </ul>
    {:else if !fromSearch}
        <small>Try searching something up there, or look at newest articles <span
                class="on-the-right"> on the right</span><span
                class="in-the-other-tab"> in the other tab</span>.</small>
    {/if}
    {#if !results || !fromSearch}
        <div class="lamp-wrap">
            <img class="lamp" src="https://ik.imagekit.io/maksiks/lamp-but-actually-centered.svg?tr=w-300" alt="a dim lamp (no search results)">
            {#if fromSearch && !results}
                <p>{noResultsTxt ?? 'The abyss gave no reply.'}</p>
            {:else if !fromSearch}
                <p>Nothing in here</p>
            {/if}
        </div>
    {/if}
</section>
<style>
    .greyed-out {
        color: #d8d8d8 !important;
        cursor: default !important;
    }

    .search-count-disappear {
        opacity: 0;
    }

    .head-main {
        font-size: 1.8rem;
        font-family: 'Comfortaa', sans-serif;
    }

    .search-seg {
        width: 100%;

        @media (max-width: 1023px) {
            width: 100%;
            box-sizing: border-box;
            padding: 1rem;
        }

        & .head-cont {
            display: flex;
            flex-direction: column;

            font-size: 2rem;
            margin-bottom: 0.5rem;

            & .head-cont-up {
                display: flex;
                flex-direction: row;
                align-items: center;

                & .head-results {
                    width: 70%;

                    & h1 {
                        display: flex;
                        flex-direction: column;
                        font-size: 2rem;

                        & .query-smol {
                            border-left: 5px solid oklch(0.8149 0.1044 290);
                            margin-top: 1rem;
                            padding-left: 1rem;
                            font-size: 1.2rem;
                        }
                    }

                    & .search-count {
                        border-left: 5px solid oklch(0.8149 0.1044 290);
                        padding-left: 1rem;

                        padding-top: 0.5rem;
                        font-size: 0.8rem;
                        color: #666666;
                    }
                }

                & .cat-dropdown-cont {
                    width: 30%;
                    font-size: 0.8rem;

                    position: relative;

                    & .cat-dropdown-toggle {
                        all: unset;
                        font-size: 0.8rem;
                        cursor: pointer;
                        padding: 0.2rem 0.5rem;
                        margin-bottom: 0.6rem;
                        border-left: 1px solid black;

                        & .cat {
                            color: #666666;
                        }
                    }

                    & .cat-dropdown-menu {
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        top: 100%;
                        left: 0;
                        background: rgba(255, 255, 255, 0.9);
                        z-index: 9999;
                        /* if there are more filters: */
                        /*box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;*/

                        & button {
                            all: unset;
                            font-size: 0.8rem;
                            cursor: pointer;
                            border-left: 1px solid black;
                            padding: 0.4rem 0.5rem;
                            height: 100%;
                        }
                    }
                }
            }
        }

        & small {
            font-size: 0.9rem;

            & .on-the-right {
                @media (max-width: 1023px) {
                    display: none;
                }
            }

            & .in-the-other-tab {
                @media (min-width: 1023px) {
                    display: none;
                }
            }
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

                @media (max-width: 768px) {
                    padding-right: 0;
                }
            }
        }

        & .search-results {
            display: flex;
            flex-direction: column;
            list-style: none;

            padding-top: 0.5rem;
        }
    }
</style>