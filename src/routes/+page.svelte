<script lang="ts">
    import '../global.css';

    //

    import Resolver from "$lib/components/Resolver.svelte";
    import ArticleHeader from "$lib/components/ArticleHeader.svelte";

    type ContentBlock =
        | { type: 'heading'; level: string; content: string }
        | { type: 'paragraph'; text: string }
        | { type: 'blockquote'; text: string }
        | { type: 'codeblock'; text: string }
        | { type: 'image'; src: string; caption: string, alt: string };

    type SectionData = ContentBlock[][];

    type Data = {
        title: string;
        fig: string;
        figcap?: string;
        figalt: string;
        blurb: string;
        date: string;
        author: string;
        pizzazz?: string;

        sections: SectionData;
    }


    const data: Data = $state({
        title: 'a',
        fig: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200',
        figcap: 'non',
        figalt: 'a really cool cat',
        blurb: 'may the force be meow you',
        date: '20.06.2025',
        author: 'Meeeeeeeeeeee',
        pizzazz: 'here is some pizzaz ',

        sections: [
            [
                {type: 'heading', level: '1', content: 'Test'},
                {type: 'paragraph', text: 'Testestest'},
                {type: 'blockquote', text: 'i\'m a blockhead or however that meme went'},
                {type: 'codeblock', text: 'im a code,yes'},
                {
                    type: 'image',
                    src: 'https://i.etsystatic.com/20311401/r/il/0a6469/6114553330/il_570xN.6114553330_r74g.jpg',
                    caption: 'megumin hat',
                    alt: 'megumin hat'
                }
            ],
            [
                {type: 'heading', level: '1', content: 'Test'},
                {type: 'paragraph', text: 'Testestest'},
                {type: 'blockquote', text: 'i\'m a blockhead or however that meme went'},
                {type: 'codeblock', text: 'im a code,yes'},
                {
                    type: 'image',
                    src: 'https://i.etsystatic.com/20311401/r/il/0a6469/6114553330/il_570xN.6114553330_r74g.jpg',
                    caption: 'megumin hat',
                    alt: 'megumin hat'
                }
            ]
        ]
    })

    // don't forget meta tags
</script>

<ArticleHeader />
<main>
    <article>
        <figure>
            <img src="{data.fig}" alt="{data.figalt}">
            <figcaption>{data.figcap}</figcaption>
        </figure>

        <div class="metablock">
            <h1>{data.title}</h1>
            <p>{data.blurb}</p>
            <p>
                <!-- TODO: parser -->
                <!-- date must be valid ISO date -->
                <time datetime="{data.date}"></time>
            </p>
            <p>{data.pizzazz}</p>
        </div>





        {#each data.sections as section}
            <section>
                {#each section as contentBlock}
                    <Resolver content={contentBlock}/>
                {/each}
            </section>
        {/each}
    </article>
</main>
<footer>
    <p>© 2025 Maksiks. Some rights chewed, others stored in a jar.</p>
</footer>

<style>
    main {
        & article {
            max-width: 664px;
            width: 100%;
            margin: 0 auto;
            & figure {
                & img {
                    width: 100%;
                }
            }
        }
    }
</style>