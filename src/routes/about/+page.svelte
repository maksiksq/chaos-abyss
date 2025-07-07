<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";
</script>

<Header />
<main>
    <div class="wrap">
        <h1>Who is behind all this</h1>
    </div>
</main>
<Footer />

<style>
    :global {
        html, body {
            overflow-y: visible;
        }
    }

    main {
        & .wrap {
            max-width: 1000px;
            width: 100%;
            padding-top: clamp(0.5rem, 1.2vw, 3rem);
            margin: 0 auto;

            & h1 {
                font-family: 'Roboto Slab', sans-serif;
            }
        }
    }
</style>