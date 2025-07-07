<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";
</script>

<Header />
<main>
    <div class="wrap">
        <h1>Who is behind all this</h1>
        <img class="pfp" src="/img/pfp40likesmth.png" alt="Maksiks profile pic">
        <div class="content">
            <p>Muhahaha - I'm Maksiks, an incredibly tired wizard individual. <br><br>I live in Ukraine <img src="/img/flag-ua.png" alt="Ukrainian flag"> and it's fun, plus we have pierogi here, they're really good. I recommend you visit here someday.<br><br> My main thing is web development, but I do have a lot of interests and passions, a lot more than I should: games, japanese, designing things, drawing, music, translating things, anime, 3d, pixel art, the list goes on. <br><br> I currently study in a college, academically, I'm the best student in the whole thing, although I kinda hate it, to be honest. I've always been a "gifted kid" and the idea never stuck off. I'm not some kinda big shot despite the apparent confidence. And no one is, I can tell from up here. <br><br> From a young age I learned English, best decision in my life. I now crawl the internet in search of information to process and store in unhealthy amounts on a daily basis. Although I unfortunately touch plenty of grass, and also I exercise.<br><br> <strong>Some things I like: </strong> Minecraft, Konosuba, VA-11 Hall-A, Frieren, Omori, Oneshot, Hades, Vocaloid music, Dead Cells, EDM music <br> <strong>Some things that keep me alive:</strong> caffeine, Svelte, Stardew Valley, badass Ukrainian soldiers on the frontlines, insanity
            </p>
        </div>
    </div>
</main>
<Footer />

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');

    :global {
        html, body {
            overflow-y: visible;
        }
    }

    main {
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