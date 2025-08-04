<script>
import Header from "$lib/components/Header.svelte";
import Footer from "$lib/components/Footer/Footer.svelte";
import EmailBox from "$lib/components/EmailBox.svelte";

const {form} = $props();

</script>

<Header />
<main>
    <div class="newsletter">
        <h1>Newsletter</h1>
        <h2>
            If you wandered in this far traveller,
        </h2>
        <h2>
            you might as well want to stick around.
        </h2>
        <p>If that's the case here's a newsletter:</p>
        <EmailBox />
    </div>
</main>
<Footer />

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
                font-size: 1.6rem;

            }
        }
    }
</style>