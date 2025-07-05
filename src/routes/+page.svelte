<script lang="ts">
    import '../styles/global.css';
    import {goto} from "$app/navigation";
    import Header from "$lib/components/Header.svelte";
    import {onDestroy, onMount} from "svelte";

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

    let body: HTMLBodyElement | undefined = $state();

    onMount(() => {
        if (document.documentElement) {
            document.documentElement.style.overflow = 'hidden';
        }

        if (body) {
            body.style.overflow = '#hidden';
        }
    })

    onDestroy(() => {
        if (document.documentElement) {
            document.documentElement.style.overflow = 'visible';
        }

        if (body) {
            body.style.overflow = 'visible';
        }
    })


    onDestroy(() => {

    })
</script>

<svelte:body bind:this={body}/>
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
    <div class="hero-wrap">
        <img role="presentation" src="/img/handgemcast.webp" alt="A hand doing some weird magic with a really cool gemstone with a star (as a wizard I can tell)"/>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Proza+Libre:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');

    main {
        display: flex;
        flex-direction: row;
        align-items: center;

        height: calc(100vh - 4rem);

        .head-wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;

            & h1 {
                font-size: 6rem;
                line-height: 1.6;

                & span {
                    /*idk which*/
                    /*font-family: 'Proza Libre', sans-serif;*/
                    /*font-family: 'Roboto Slab', sans-serif;*/
                    font-weight: normal;
                    padding-left: 2rem;
                    padding-right: 2rem;
                }

                .deep-thoughts {
                    color: #242525;
                    background: #FFA7A7;
                }

                .clear-words {
                    color: #1f2020;
                    background: #FB8E8E;
                }
            }

            & .cta-cont {
                position: relative;
                margin-left: 2.6rem;
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

        .hero-wrap {
            align-self: flex-end;
            display: flex;
            align-items: flex-end;

            margin-left: 12rem;
            height: 100%;
            aspect-ratio: 424 / 810;
            img {
                width: 100%;
                height: calc(100% - 2rem);
            }
        }
    }
</style>