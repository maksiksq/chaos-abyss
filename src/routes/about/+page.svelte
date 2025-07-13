<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";
</script>

<Header/>
<main>
    <div class="wrap">
        <section class="this-site">
            <h2>About this place</h2>
            <p>Leaving in a little bit about the site here.<br><br> <strong>Chaos Abyss</strong> - is a my fun little
                blog/I put in too much effort into this and it's actually kinda journalistic, and <i>probably</i> well
                researched type of thing. So I try to make it fun to read and informative, and hope you like it. <br><br>This site covers a wide range of things, but mostly it's the stuff I'm into. Or it's just interesting as fuck.<br><br>
                The thing is built and crafted in Svelte, and it's <a href="https://github.com/maksiksq/chaos-abyss/" style="text-decoration: underline; cursor: pointer" > open sauce</a>. Go check it out, or else...
                <br><br>
                <strong>AI policy:</strong><br> Shrimple. Spellcheck, idk dumb
                question about cats or something - ok. sure. Any actual research - no never why that'd be so dumb, I'll
                just spend my minute actually looking into it. <br><br> <strong>Why Chaos Abyss?:</strong><br> Ehh, it's
                a very deep <span style="color: #666666; cursor: pointer"
                                  onclick={() => {const audio = new Audio('/audio/ba-dum-tss.mp3'); audio.play()}}
                                  onkeydown={() => {}} tabindex="-3" role="button">(ba dum tss)</span> metaphor. You can
                interpret it however you wish though.<br><br> <strong>You might see:</strong> <br>- Overanalysis of things that probably don’t need it. <br>- Occasional shouting into the void. <br>- Mild chaos, some abyss. <br>- Unhinged passion for details.<br> - Lore. Wait no. </p>
        </section>
        <section class="content">
            <img class="pfp" src="/img/pfp40likesmth.png" alt="Maksiks profile pic" loading="lazy"/>
            <h1>Who is behind all this</h1>
            <p>Muhahaha - I'm Maksiks, an incredibly tired wizard individual. <br><br>I live in Ukraine <img
                    class="smol" src="/img/flag-ua.png" alt="Ukrainian flag"> and it's fun here, plus we have pierogi,
                and they're crazy good. And I recommend you visit here someday.<br><br> My main thing is web development,
                but I do have a lot of interests and passions, a lot more than I should. <br><br> I
                currently study in a college, academically, I'm the best student in the whole thing. Although, I hate it to the core. <br><br> From a young
                age I learned English, the best decision in my life. I now crawl the internet in search of information to
                process and store in unhealthy amounts on a daily basis. Although I unfortunately touch plenty of grass,
                and also I exercise.<br><br> <strong>Some things I like: </strong> Minecraft, Konosuba, VA-11 Hall-A,
                Frieren, Omori, Oneshot, Hades, Vocaloid music, Dead Cells, EDM music <br> <strong>Some things that keep
                    me alive:</strong> caffeine, Svelte, Stardew Valley, badass Ukrainian soldiers on the frontlines,
                insanity
            </p>
        </section>
    </div>
</main>
<Footer about={true}/>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');

    :global {
        html, body {
            overflow-y: visible;
        }
    }

    main {
        padding-bottom: 10vh;

        @media (max-width: 768px) {
            padding-bottom: 1vh;
        }

        & .wrap {
            display: flex;

            max-width: 1200px;
            width: 100%;
            padding-top: clamp(0.1rem, 0.5rem, 2rem);
            margin: 0 auto;

            @media (max-width: 768px) {
                flex-direction: column;
                padding: 1rem;
                box-sizing: border-box;
            }

            & .this-site {
                width: 50%;
                padding: 1rem;
                box-sizing: border-box;

                & h2 {
                    font-weight: bolder;
                    font-family: 'Roboto Slab', sans-serif;
                }
            }

            & .content {
                margin-top: 1rem;
                font-size: 1rem;
                width: 50%;
                padding: 1rem;
                box-sizing: border-box;

                & h1 {
                    font-family: 'Roboto Slab', sans-serif;
                    padding-bottom: 1rem;
                }

                & .smol {
                    display: inline;
                    width: 1rem;
                    vertical-align: middle;
                }

                & .pfp {
                    aspect-ratio: 1;
                    border-radius: 1px;
                    border: 1px solid black;
                    margin-left: 1rem;
                    margin-bottom: 0.5rem;
                    width: 200px;
                    float: right;

                    @media (max-width: 768px) {
                        display: block;
                        float: right;

                        margin: 1rem auto 0.2rem auto;
                    }
                }
            }


        }
    }
</style>