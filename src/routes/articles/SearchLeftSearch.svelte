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
    <h1><span class={!fromSearch ? 'd-none' : ''}>Results for:</span>{query}</h1>
    <small>try searching something up there, or look at newest articles on the right.</small>
    <div class="search-results">
        <SearchSummaries data={results}/>
    </div>
</section>
<style>
    .search-seg {
        width: 40%;

        .search-results {
            display: flex;
            flex-direction: column;
        }
    }
</style>