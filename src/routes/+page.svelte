<script lang="ts">
    import Resolver from "$lib/components/Resolver.svelte";

    type ContentBlock =
        | { type: 'heading'; level: string; content: string }
        | { type: 'paragraph'; content: string }
        | { type: 'blockquote'; content: string }
        | { type: 'codeblock'; content: string }
        | { type: 'image'; content: string; alt: string };

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
                {type: 'paragraph', content: 'Testestest'},
                {type: 'image', content: 'an src', alt: ''}
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