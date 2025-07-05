<script lang="ts">
    import '../styles/global.css';
    import {goto} from "$app/navigation";
    import Header from "$lib/components/Header.svelte";

    const cheatCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    let codeIx = 0;
    const maxDelay = 3000;
    let past = Date.now();

    const handleTravelToEditor = (e: KeyboardEvent) => {
        const now = Date.now();

        if (now - past > maxDelay) {
            codeIx = 0;
        }

        past = now;

        if (e.key === cheatCode[codeIx]) {
            codeIx++;
            if (codeIx === cheatCode.length) {
                goto('admin/editor');
                codeIx = 0;
            }
        } else {
            codeIx = 0;
        }
    }
</script>

<svelte:window on:keydown={handleTravelToEditor} />

<Header/>
<main>
    <h1>Deep Thoughts. <br>Clear Words. </h1>

        <a href="/articles">
            h
        </a>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Proza+Libre:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');
    main {
        display: flex;
        align-items: center;

        height: calc(100vh - 4rem);

        & h1 {
            /*idk which*/
            /*font-family: 'Proza Libre', sans-serif;*/
            font-family: 'Roboto Slab', sans-serif;
            font-weight: normal;
        }
    }
</style>