<script>
import Header from "$lib/components/Header.svelte";
import Footer from "$lib/components/Footer/Footer.svelte";
import EmailBox from "$lib/components/EmailBox.svelte";

const {form} = $props();
// dont forget meta tags
</script>

<Header />
<main>
    <div class="newsletter">
        <h1>Newsletter</h1>
        <p class="txt">Want to get an email every time a new article comes out? Subscribe!</p>
        <h2>
            If you wandered in this far traveller,
        </h2>
        <h2 class="stick">
            you might as well want to stick around.
        </h2>
        <p class="txt">If that's the case here's a newsletter:</p>
        <EmailBox {form} lirith={false}/>
        <p>You'll only get a notification whenever a new article comes out and maybe some important info once in a while. No ads, no nothing, no spam in your inbox!</p>
        <p class="txt-bottom">That's it. Nothing fancy - just good writing, when it's ready.</p>
    </div>
</main>
<Footer newsletter={true} />

<style>
    main {
        display: flex;
        justify-content: center;

        .newsletter {
            min-height: 100vh;
            max-width: 840px;
            padding: 0 2rem;
            box-sizing: border-box;
            width: 100%;

            @media (max-width: 768px) {
                margin: 2vh auto 0 auto;
                padding: 0 1.4rem;
            }

            & h1 {
                font-family: 'Roboto Slab', sans-serif;
                font-size: 4rem;
                border-bottom: 1px solid black;

                @media (max-width: 768px) {
                    font-size: 3.6rem;
                }
            }

            & h2:nth-of-type(1) {
                margin-top: 1rem;
            }

            & h2 {
                padding-top: 0.5rem;
                font-size: 2rem;

                color: #131313;
                font-weight: bold;

                @media (max-width: 768px) {
                    padding-top: 0;
                }
            }

            & .stick {
                display: flex;
                justify-content: flex-end;
            }

            & .txt {
                padding-top: 2rem;
            }

            & .txt-bottom {
                padding-top: 1rem;
            }
        }
    }
</style>