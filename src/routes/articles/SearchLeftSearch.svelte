<script lang="ts">
    import SearchSummaries from "./SearchSummaries.svelte";

    let {results = [], fromSearch = false, query = 'Welcome to the Abyss', cat = "Any", categoryNames} = $props();

    let greg = $state(false);
    categoryNames.push('Any');
    // make client request category in url
</script>


<section class="search-seg">
    <div class="head-cont">
        <div class="head-cont-up">
            <h1 class="head-item {fromSearch ? '' : 'd-none'}">Results for:&nbsp;</h1>
            <div class="head-item cat-dropdown-cont">
                <button onclick={() => {greg = true;}} onblur={() => {setTimeout(() => {greg = false;}, 100)}} class="cat-dropdown-toggle">
                    Category: <br><span class="cat">{cat}</span>
                </button>
                {#if greg}
                    <div class="cat-dropdown-menu">
                        {#each categoryNames as gregory}
                            <button onclick={() => {cat = gregory}}>{gregory}</button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        <div class="head-item {fromSearch ? 'query-smol' : '' }">{query}</div>
    </div>
    {#if fromSearch}
        <ul class="search-results">
            <SearchSummaries data={results} {fromSearch}/>
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
    .search-seg {
        width: 40%;
        padding-right: 1rem;

        & .head-cont {
            display: flex;
            flex-direction: column;

            font-size: 2rem;
            margin-bottom: 0.5rem;

            & .head-cont-up {
                display: flex;
                flex-direction: row;
                align-items: center;

                & h1 {
                    font-size: 2rem;
                    width: 70%;
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

            & .query-smol {
                border-left: 5px solid oklch(0.8149 0.1044 290);
                padding-left: 1rem;
                grid-column: span 2;
                font-size: 1.2rem;
            }
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