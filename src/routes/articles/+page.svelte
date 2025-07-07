<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";
    import SearchRightMasonry from "./SearchRightMasonry.svelte";
    import SearchLeftSearch from "./SearchLeftSearch.svelte";

    let {data} = $props();
    let fromSearch = false;
    let query = 'Welcome to the Abyss';

    type FeatArticle = {
        title: string;
        img: string;
        blurb: string;
        slug: string;
        date: string;
        time: string;
        commentCount: number;
    }
    type Feats = {
        name: string;
        summaries: FeatArticle[]
    }[];

    // Dev Stuff
    // Japanese
    // Games & Media
    // Project Stash
    // Miscellaneous
    // Later ? Design
    // Later ? Electronics

    const feats: Feats = [
        {
            "name": "Dev Stuff",
            "summaries": [{
                "title": "Svelte is cool",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "yeet theee cat",
                "slug": "example",
                "date": "Jun 20, 2025",
                "time": "3 mins",
                "commentCount": 0
            }, {
                "title": "Svelte is the best thing ever",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "summon thee developer tes ttestst tteststestsetestest tesdfffffffffffffffffffffffffffffst",
                "slug": "example",
                "date": "Jun 21, 2025",
                "time": "4 mins",
                "commentCount": 3
            }, {
                "title": "Svelte is the best thing ever",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "summon thee develosdfffffffffffffffffffff fffffffff fffffffffff ffffffffffffffffffffffffper",
                "slug": "example",
                "date": "Jun 22, 2025",
                "time": "2 mins",
                "commentCount": 5
            }]
        },
        {
            "name": "Miscellaneous",
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
            },{
                "title": "OneShot is also cool",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "summon theeeeeee developer",
                "slug": "example",
                "date": "Mar 16, 2025",
                "time": "3 mins",
                "commentCount": 3
            },{
                "title": "OneShot is also cool",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "summon theeeeeee developer",
                "slug": "example",
                "date": "Mar 16, 2025",
                "time": "3 mins",
                "commentCount": 3
            }]
        },
        {
            "name": "Japanese",
            "summaries": [{
                "title": "How i found out about the word for Beans in Japanese.",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "yeet the cat",
                "slug": "example",
                "date": "Jul 1, 2025",
                "time": "5 mins",
                "commentCount": 1
            }, {
                "title": "How i found out about the word for Wallpapers in Japanese.",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "summon the developer",
                "slug": "example",
                "date": "Jul 2, 2025",
                "time": "4 mins",
                "commentCount": 2
            }]
        },
        {
            "name": "Games & Media",
            "summaries": [{
                "title": "Hades is poggers",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "yeet theee cat",
                "slug": "example",
                "date": "May 30, 2025",
                "time": "6 mins",
                "commentCount": 0
            }, {
                "title": "OneShot is also cool",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "summon theeeeeee developer",
                "slug": "example",
                "date": "May 31, 2025",
                "time": "5 mins",
                "commentCount": 4
            }]
        },
        {
            "name": "Project Stash",
            "summaries": [{
                "title": "Lirith is cool",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "yeet theee cat",
                "slug": "example",
                "date": "Apr 18, 2025",
                "time": "3 mins",
                "commentCount": 1
            }, {
                "title": "Lirith is not yet a thing",
                "img": "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
                "blurb": "summon thee developer",
                "slug": "example",
                "date": "Apr 19, 2025",
                "time": "4 mins",
                "commentCount": 2
            }]
        }
    ];

</script>

<Header/>
<main>
    <SearchLeftSearch {fromSearch} {query} />
    <SearchRightMasonry {feats}/>
        <!--        <ul>-->
        <!--            &lt;!&ndash;{#each data.summaries as {slug, title}}&ndash;&gt;-->
        <!--            &lt;!&ndash;    <li><a href="/articles/{slug}">{title}</a></li>&ndash;&gt;-->
        <!--            &lt;!&ndash;{/each}&ndash;&gt;-->
        <!--        </ul>-->
</main>

<Footer/>
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
        padding-left: clamp(0.1rem, 3vw, 8vw);
        padding-right: clamp(0.1rem, 2vw, 10vw);
        padding-top: clamp(0.5rem, 1.2vw, 3rem);
        margin: 0 auto;
        box-sizing: border-box;

        min-height: 200vh;
    }
</style>