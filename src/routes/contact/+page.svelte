<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";
    import TooltipText from "$lib/components/TooltipText.svelte";

</script>

<Header/>
<main>
    <div class="wrap">
        <h1>Contact:</h1>
        <img class="pfp" src="/img/pfp40likesmth.png" alt="Maksiks profile pic">
        <address class="content">
            The best way to contact me is via email:<br>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path fill="#190025"
                      d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
            </svg>
            <TooltipText text={'maksiks.touch@gmail.com'}/>
            <br>
            <br>
            The second best way to contact me is on Discord:<br>
            <TooltipText text={'@maksiks'}/>
            <br>
            <br>
            <ul class="socials">
                Alternatively
                <li>

                </li>
            </ul>
        </address>
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
                font-style: normal;

                & svg {
                    display: inline;
                    width: 1rem;
                    vertical-align: text-top;
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