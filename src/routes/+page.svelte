<script lang="ts">
    type Data = {
        title: string;
        fig: string;
        figcap?: string;
        figalt: string;
        blurb: string;
        date: string;
        author: string;
        pizzazz?: string;
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
    </article>
    <section>
        <h2></h2>
        <p></p>
    </section>
    <section>
        <h2></h2>
        <p></p>
    </section>
</main>
<footer></footer>