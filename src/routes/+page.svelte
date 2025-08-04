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

<main>
    <section class="heading-wrap">
        <h1 style="font-size: 6rem">Chaos Abyss</h1>
        <h2><span class="deep-thoughts">Deep Thoughts </span><br><span class="clear-words">Clear Words </span></h2>
        <div class="cta-cont">
            <a href="/articles" aria-label="Read some articles on Chaos Abyss" class="cta-button" onmouseover={buttonAnimIn} onmouseout={buttonAnimOut}
               onfocus={buttonAnimIn} onblur={buttonAnimOut}>
                Step Inside
            </a>
            <div aria-hidden="true" tabindex="-1" role="presentation" class={`cta-button-hidden ${ctaButtonAnim ? 'cta-hidden-in' : ''}`} bind:this={ctaButtonHidden}>
                Step Inside
            </div>
        </div>
    </section>
    <section aria-label="Hero animation" class="hero-wrap">
        <video loop autoplay muted src="/img/gem-anim-final.webm"
               aria-label="A hand doing some weird magic"></video>
    </section>
</main>

<style>
    .cta-hidden-in {
        margin-top: 3rem !important;
        margin-left: 0 !important;
    }

    main {
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow-y: visible;

        height: calc(100vh - 4rem);

        @media (max-width: 768px) {
            height: 100%;
        }

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
            padding-top: 1rem;
        }

        .heading-wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 60%;

            margin-left: 1rem;
            border-left: 3px solid #242525;

            @media (max-width: 1279px) {
                margin-top: 4rem;
            }

            @media (max-width: 768px) {
                margin-top: 0;
                margin-left: 0.3rem;
                border-left: 1px solid #242525;
            }

            & h1 {
                font-family: 'Roboto Slab', sans-serif, Georgia;
                font-weight: normal;
                font-size: 6rem;
                width: fit-content;

                margin-top: 2rem;
                padding-left: 2rem;
                padding-right: 2rem;
                color: #242525;
                border-bottom: 3px solid #242525;

                @media (max-width: 1279px) {
                    font-size: 4rem;
                }

                @media (max-width: 768px) {
                    padding-left: 0.7rem;
                    border-bottom: 1px solid #242525;
                    font-size: 5rem;
                }
                @media (max-width: 420px) {
                    font-size: 5rem;
                }
            }

            & h2 {
                margin-top: 2rem;
                font-size: 4rem;
                line-height: 1.8;

                @media (max-width: 420px) {
                    font-size: 3rem;
                }

                & span {
                    font-family: 'Roboto Slab', sans-serif;
                    font-weight: normal;
                    padding-left: 2rem;
                    padding-right: 2rem;

                    transition: all 0.2s;

                    &:hover {
                        transform: translate(0px, 10px);
                        box-shadow: rgba(0, 0, 0, 1) 0 0 0;
                    }
                }

                & .deep-thoughts {
                    display: inline-block;
                    line-height: 1.2;
                    color: #242525;
                    background: linear-gradient(70deg, #826e8c, #FFA7A7);

                    padding-bottom: 0.4rem;
                    box-shadow: rgba(0, 0, 0, 0.09) 0 2px 1px, rgba(0, 0, 0, 0.09) 0 4px 2px, rgba(0, 0, 0, 0.09) 0 8px 4px, rgba(0, 0, 0, 0.09) 0 16px 8px, rgba(0, 0, 0, 0.09) 0 32px 16px;
                }


                & .clear-words {
                    display: inline-block;
                    line-height: 1.25;
                    color: #1f2020;
                    background: linear-gradient(70deg, #6c497e, #FB8E8E);
                    box-shadow: rgba(0, 0, 0, 0.09) 0 2px 1px, rgba(0, 0, 0, 0.09) 0 4px 2px, rgba(0, 0, 0, 0.09) 0 8px 4px, rgba(0, 0, 0, 0.09) 0 16px 8px, rgba(0, 0, 0, 0.09) 0 32px 16px;

                    @media (max-width: 420px) {
                        margin-top: 0.5rem;
                    }
                }
            }

            & .cta-cont {
                position: relative;
                margin-left: 2.6rem;
                margin-bottom: 6rem;

                @media (max-width: 768px) {
                    margin-left: 0.6rem;
                }

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
                    border: solid black 2px;
                    box-shadow: 0 0 0 1px white;



                    @media (max-width: 420px) {
                        font-size: 1rem;
                    }
                }

                & .cta-button-hidden {
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
                    border: solid black 2px;

                    transition: 0.2s all;

                    @media (max-width: 420px) {
                        font-size: 1rem;
                    }
                }
            }
        }

        .hero-wrap {
            align-self: flex-end;
            display: flex;
            justify-content: center;
            align-items: flex-end;

            width: 40%;
            height: 100%;
            aspect-ratio: 424 / 810;
            transform: translateY(16px);

            @media (max-width: 768px) {
                width: 100%;
                align-items: center;
            }

            video {
                height: 120%;
                @media (max-width: 1279px) {
                    width: 60%;
                }

                @media (max-width: 767px) {
                    width: 80%;
                }
            }
        }
    }
</style>