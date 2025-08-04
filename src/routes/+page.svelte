<script lang="ts">
    import {goto} from "$app/navigation";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";

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
                goto('/admin/dashboard');
                codeIx = 0;
            }
        } else {
            codeIx = 0;
        }
    }


    let ctaButtonHidden: HTMLElement | undefined = $state();
    let ctaButtonAnim = $state(false);

    const buttonAnimIn = () => {
        if (!ctaButtonHidden) {
            return;
        }

        ctaButtonAnim = true;
    }

    const buttonAnimOut = () => {
        if (!ctaButtonHidden) {
            return;
        }

        ctaButtonAnim = false;
    }

</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />

</svelte:head>
<svelte:window on:keydown={handleTravelToEditor}/>

<h1>soup</h1>

<style>
</style>