<script lang="ts">
    type Data = {
        title: string;
        img: string;
        imgAlt: string;
        blurb: string;
        date: string;
        author: string;
        pizzazz?: string;
    }

    const data: Data = $state({
        title: 'a',
        img: '',
        imgAlt: '',
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
            <img alt="">
            <figcaption>

            </figcaption>
        </figure>
    </article>
    <section></section>
    <section></section>
</main>
<footer></footer>