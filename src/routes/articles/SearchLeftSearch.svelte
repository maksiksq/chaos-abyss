<script>
    import SearchSummaries from "./SearchSummaries.svelte";

    let {fromSearch = false, query = 'Welcome to the Abyss'} = $props();

    const results = {
        "summaries": [{
            "title": "Hades is poggers",
            "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
            "blurb": "yeet theee cat",
            "slug": "example",
            "date": "Mar 15, 2025",
            "time": "2 mins",
            "commentCount": 0
        }, {
            "title": "OneShot is also cool",
            "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
            "blurb": "summon theeeeeee developer",
            "slug": "example",
            "date": "Mar 16, 2025",
            "time": "3 mins",
            "commentCount": 3
        }, {
            "title": "OneShot is also cool",
            "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
            "blurb": "summon theeeeeee developer",
            "slug": "example",
            "date": "Mar 16, 2025",
            "time": "3 mins",
            "commentCount": 3
        }, {
            "title": "OneShot is also cool",
            "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
            "blurb": "summon theeeeeee developer",
            "slug": "example",
            "date": "Mar 16, 2025",
            "time": "3 mins",
            "commentCount": 3
        }, {
            "title": "Hades is poggers",
            "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
            "blurb": "yeet theee cat",
            "slug": "example",
            "date": "Mar 15, 2025",
            "time": "2 mins",
            "commentCount": 0
        }, {
            "title": "OneShot is also cool",
            "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
            "blurb": "summon theeeeeee developer",
            "slug": "example",
            "date": "Mar 16, 2025",
            "time": "3 mins",
            "commentCount": 3
        }, {
            "title": "OneShot is also cool",
            "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
            "blurb": "summon theeeeeee developer",
            "slug": "example",
            "date": "Mar 16, 2025",
            "time": "3 mins",
            "commentCount": 3
        }, {
            "title": "OneShot is also cool",
            "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
            "blurb": "summon theeeeeee developer",
            "slug": "example",
            "date": "Mar 16, 2025",
            "time": "3 mins",
            "commentCount": 3
        }]
    }
</script>
<section class="search-seg">
    <h1><span class={fromSearch ? '' : 'd-none'}>Results for:&nbsp;</span><br><span
            class={fromSearch ? 'query-smol' : '' }>{query}</span></h1>
    {#if fromSearch}
        <ul class="search-results">
            <SearchSummaries data={results}/>
        </ul>
    {:else}
        <small>Try searching something up there, or look at newest articles on the right.</small>
    {/if}
    {#if results}
        <div class="lamp-wrap">
            <img class="lamp" src="/img/lamp.svg" alt="a dim lamp (no search results)">
            {#if fromSearch}
                <p>The abyss gave no reply.</p>
            {:else}
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