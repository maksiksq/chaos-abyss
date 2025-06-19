<script lang="ts">
    import Resolver from "$lib/components/Resolver.svelte";

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
        fig: '',
        figcap: '',
        figalt: '',
        blurb: '',
        date: '',
        author: '',
        pizzazz: '',

        sections: [
            [
                {type: 'heading', level: '1', content: 'Test'},
                {type: 'paragraph', text: 'Testestest'},
                {type: 'blockquote', text: 'i\'m a blockhead or however that meme went'},
                {type: 'codeblock', text: 'im a code,yes'},
                {type: 'image', src: 'https://i.etsystatic.com/20311401/r/il/0a6469/6114553330/il_570xN.6114553330_r74g.jpg', caption: 'megumin hat', alt: 'megumin hat'}
            ],
            [
                {type: 'heading', level: '1', content: 'Test'},
                {type: 'paragraph', text: 'Testestest'},
                {type: 'blockquote', text: 'i\'m a blockhead or however that meme went'},
                {type: 'codeblock', text: 'im a code,yes'},
                {type: 'image', src: 'https://i.etsystatic.com/20311401/r/il/0a6469/6114553330/il_570xN.6114553330_r74g.jpg', caption: 'megumin hat', alt: 'megumin hat'}
            ]
        ]
    })
</script>

<header>
    <nav>
        <ul>
            <li>
                <a href="#" aria-label="Home">
                    <img src="#" alt="logo">
                </a>
            </li>
            <li>
                <!-- search eventually -->
            </li>
            <li>
                <a href="#">
                    About
                </a>
            </li>
        </ul>
    </nav>
</header>
<main>
    <article>
        <h1>{data.title}</h1>
        <p>
            <!-- TODO: parser -->
            <time datetime="{data.date}"></time>
        </p>

        <figure>
            <img src="{data.fig}" alt="{data.figalt}">
            <figcaption>{data.figcap}</figcaption>
        </figure>

        {#each data.sections as section}
            <section>
                {#each section as contentBlock}
                    <Resolver content={contentBlock} />
                {/each}
            </section>
        {/each}
    </article>
</main>
<footer></footer>