<script lang="ts">
    import SearchSummaries from "./SearchSummaries.svelte";
    import {goto} from "$app/navigation";

    let {
        results = [],
        searchCount = null,
        fromSearch = false,
        query = 'Welcome to the Abyss',
        noResultsTxt = 'The abyss gave no reply.',
        cat = "Any",
        categoryNamesRaw,
        categoryNames
    } = $props();

    let greg = $state(false);

    // easter eggs
</script>

<section class="search-seg">
    <div class="head-cont">
        {#if fromSearch}
            <div class="head-cont-up">
                <div class="head-results">
                    <h1>Results for:&nbsp; <span class="query-smol">{query}</span></h1>
                    <p class="search-count {searchCount ? '' : 'd-none' }">{searchCount} results found</p>
                </div>
                <div class="head-item cat-dropdown-cont">
                    <button aria-label="Select category" onclick={() => {greg = !greg;}}
                            onblur={() => {setTimeout(() => {greg = false;}, 100)}} class="cat-dropdown-toggle">
                        Category: <br><span class="cat">{cat}</span>
                    </button>
                    {#if greg}
                        <div class="cat-dropdown-menu">
                            {#each categoryNames as gregory}
                                <button onclick={async () => {await goto(`/articles?query=${query}&category=${categoryNamesRaw[categoryNames.indexOf(gregory)]}`)}}>{gregory}</button>
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
            <SearchSummaries data={results} {fromSearch}/>
        </ul>
    {:else if !fromSearch}
        <small>Try searching something up there, or look at newest articles <span
                class="on-the-right"> on the right</span><span
                class="in-the-other-tab"> in the other tab</span>.</small>
    {/if}
    {#if !results || !fromSearch}
        <div class="lamp-wrap">
            <img class="lamp" src="/img/lamp-but-actually-centered.svg" alt="a dim lamp (no search results)">
            {#if fromSearch && !results}
                <p>{noResultsTxt ?? 'The abyss gave no reply.'}</p>
            {:else if !fromSearch}
                <p>Nothing in here</p>
            {/if}
        </div>
    {/if}
</section>
<style>
    .head-main {
        font-size: 1.8rem;
        font-family: 'Comfortaa', sans-serif;
    }

    .search-seg {
        width: 40%;
        padding-right: 1rem;

        @media (max-width: 768px) {
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

                        button {
                            all: unset;
                            font-size: 0.8rem;
                            cursor: pointer;
                            border-left: 1px solid black;
                            padding: 0.4rem 0.5rem;
                        }
                    }
                }
            }
        }

        & small {
            font-size: 0.9rem;

            & .on-the-right {
                @media (max-width: 768px) {
                    display: none;
                }
            }

            & .in-the-other-tab {
                @media (min-width: 768px) {
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