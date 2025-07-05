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


    let ctaButtonFake: HTMLElement | undefined = $state();

    const buttonAnimIn = () => {
        if (!ctaButtonFake) {
            return;
        }

        ctaButtonFake.style.marginTop = "3rem";
        ctaButtonFake.style.marginLeft = "0";
    }

    const buttonAnimOut = () => {
        if (!ctaButtonFake) {
            return;
        }

        ctaButtonFake.style.marginTop = "3.3rem";
        ctaButtonFake.style.marginLeft = "0.4rem";
    }
</script>

<svelte:window on:keydown={handleTravelToEditor}/>

<Header/>
<main>
    <div class="head-wrap">
        <h1><span class="deep-thoughts">Deep Thoughts. </span><br><span class="clear-words">Clear Words. </span></h1>
        <div class="cta-cont">
            <a href="/articles" class="cta-button" onmouseover={buttonAnimIn} onmouseout={buttonAnimOut} onfocus={buttonAnimIn} onblur={buttonAnimOut}>
                Step Inside
            </a>
            <div class="cta-button-fake" bind:this={ctaButtonFake}>
                Step Inside
            </div>
        </div>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Proza+Libre:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;

        height: calc(100vh - 4rem);

        .head-wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;

            & h1 {
                /*idk which*/
                /*font-family: 'Proza Libre', sans-serif;*/
                font-family: 'Roboto Slab', sans-serif;
                font-weight: normal;

                font-size: 7.4rem;
                line-height: 1.6;

                .deep-thoughts {
                    color: #242525;
                }

                .clear-words {
                    color: #1f2020;
                }
            }

            & .cta-cont {
                position: relative;
                margin-left: 10px;
                margin-bottom: 6rem;

                & .cta-button {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    color: white;
                    cursor: pointer;

                    margin-top: 3rem;
                    border-radius: 32px;
                    width: 8rem;
                    font-size: 1.2rem;
                    padding: 0.5rem 2.6rem;
                    border: solid black 3px;
                    mix-blend-mode: difference;
                    box-shadow: 0 0 0 1px white;
                }

                & .cta-button-fake {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: -1;

                    margin-top: 3.3rem;
                    margin-left: 0.4rem;

                    color: transparent;
                    cursor: pointer;
                    background-color: #1f2020;

                    border-radius: 32px;
                    width: 8rem;
                    font-size: 1.2rem;
                    padding: 0.5rem 2.6rem;
                    border: solid black 3px;

                    transition: 0.2s all;
                }
            }
        }
    }
</style>