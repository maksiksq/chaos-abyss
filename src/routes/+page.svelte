<script lang="ts">
    type Data = {
        title: string;
        blurb: string;
        date: string;
        author: string;
        pizzazz?: string;
    }

    const data: Data = $state({
        title: '',
        blurb: '',
        date: '',
        author: '',
        pizzazz: '',
    })
</script>

<header>
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
</header>
<main>
    <h1>{data.title}</h1>
    <section></section>
    <section></section>
</main>
<footer></footer>