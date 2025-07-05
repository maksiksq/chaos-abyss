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
                console.log('time travel');
                goto('editor');
                codeIx = 0;
            }
        } else {
            codeIx = 0;
        }
    }
</script>

<svelte:window on:keydown={handleTravelToEditor} />

<Header/>
<h1>Chaos <br>Abyss</h1>

<a href="/articles">hi</a>

<style>
</style>