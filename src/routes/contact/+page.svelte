<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";

    let copy = $state('Click to copy');
    let hovering = $state(false);

    const handleTooltip = () => {
        hovering = true;
        copy = 'Click to copy';
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText("maksiks.touch@gmail.com");

        copy = 'Copied!';
    }

    const handleCopyKeyboard = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault;
            navigator.clipboard.writeText("maksiks.touch@gmail.com")
        }

        copy = 'Copied!';
    }

    const handleCopyOut = () => {
        copy = 'Click to copy';
        hovering = false;
    }

    let tooltip: HTMLElement | undefined = $state();

    const handleCopyMove = (e: MouseEvent) => {
        if (!tooltip) return;
        tooltip.style.left = `${e.clientX+10}px`;
        tooltip.style.top = `${e.clientY-20}px`;
    }
</script>

<Header/>
<main>
    <div class="wrap">
        <h1>Contact me:</h1>
        <img class="pfp" src="/img/pfp40likesmth.png" alt="Maksiks profile pic">
        <div class="content">
            The best way to contact me is via email:<br>
            <div class="email" onmouseenter={handleTooltip} onmousemove={handleCopyMove} onclick={handleCopyClick} onkeydown={handleCopyKeyboard} onmouseout={handleCopyOut}
                 onblur={handleCopyOut} aria-label="email" tabindex="0" role="button">
                {#if hovering}
                    <div class="tooltip" bind:this={tooltip}>
                        {copy}
                    </div>
                {/if}
                maksiks.touch@gmail.com
            </div>
        </div>
    </div>
</main>
<Footer contact={true}/>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');

    :global {
        html, body {
            overflow-y: visible;
        }
    }

    .tooltip {
        position: absolute;
        pointer-events: none;
        transition: none;
        background: #666666; color: white;
        padding: 1px 0.7rem;
        border-radius: 1px;
        font-family: "Anonymous Pro", sans-serif;
        border:  1px solid black;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    main {
        padding-bottom: 10vh;

        & .wrap {
            display: grid;
            grid-template-columns: 1fr 30%;
            grid-template-rows: min-content 1fr;

            max-width: 1000px;
            width: 100%;
            padding-top: clamp(0.5rem, 6rem, 3rem);
            margin: 0 auto;


            & h1 {
                font-family: 'Roboto Slab', sans-serif;
            }

            & .content {
                margin-top: 1rem;
                font-size: 1rem;

                & .email {
                    cursor: pointer;
                }

                & img {
                    display: inline;
                    width: 1rem;
                    vertical-align: middle;
                }
            }

            & .pfp {
                grid-row: span 2;
                margin-left: 2rem;
                aspect-ratio: 1;
                border-radius: 4px;
                border: 3px solid black;
                width: 100%;
            }
        }
    }
</style>