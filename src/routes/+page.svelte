<script lang="ts">
    import '../global.css';

    import Resolver from "$lib/components/Resolver.svelte";
    import ArticleHeader from "$lib/components/ArticleHeader.svelte";
    import {onMount} from "svelte";

    type ContentBlock =
        | { type: 'heading'; level: string; content: string }
        | { type: 'paragraph'; text: string }
        | { type: 'blockquote'; text: string, author?: string, citeLink?: string, cite?: string }
        | { type: 'codeblock'; text: string }
        | { type: 'image'; src: string; caption: string, alt: string }
        // TODO: for now arbitrary is just html, maybe i'll add something later if necessary
        | { type: 'arbitrary'; html: string; };

    type SectionData = ContentBlock[][];

    type Data = {
        title: string;
        fig: string;
        figcap?: string;
        figalt: string;
        blurb: string;
        date: string;
        author: string;
        authorLink: string;

        sections: SectionData;
    }


    const data: Data = $state({
        title: 'AN EXAMPLE ARTICLE ABOUT CATS',
        fig: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200',
        // figcap: 'non',
        figalt: 'a really cool cat',
        blurb: 'may the force be meow you',
        date: '2025-06-20',
        author: 'Meeeeeeeeeeee',
        authorLink: '#',

        sections: [
            [
                {type: 'paragraph', text: '*Bacon ipsum* \n dolor amet shoulder \n \n | First Header  | Second Header |\n' +
                        '| ------------- | ------------- |\n' +
                        '| Content Cell  | Content Cell  |\n' +
                        '| Content Cell  | Content Cell  |\n' + '\n'
                         + 'shankle ham pancetta, pastrami pork belly tri-tip. Buffalo tongue tri-tip brisket, meatball short loin ball tip cow. Strip steak chislic spare ribs, chuck short loin turkey pig. Turkey brisket tongue burgdoggen cow ball tip. Cupim sausage corned beef pork chop flank prosciutto. Pork belly chislic porchetta tail filet mignon, ground round turducken corned beef swine.\n' +

                        '\n' +
                        'T-bone tenderloin [a](http://localhost:5173/) short loin, `chicken strip steak turkey` ' + '\n' +
                        '> cow capicola shank chislic biltong' + '\n' + '> — someone at the cafeteria' + '\n' + '\n' +
                                ' ```buffalo boudin```. Drumstick salami ``tongue`` ball tip chicken tail. Shoulder meatball bacon chicken. Pancetta shoulder ground round corned beef rump andouille jowl, beef ribs hamburger turkey salami. Tri-tip turkey meatball meatloaf, beef boudin pork fatback sirloin ball tip strip steak pig salami. Pancetta andouille spare ribs sirloin. Pig pork chop doner, filet mignon bresaola pork belly beef rump bacon boudin pork.\n' +
                        '\n' +
                        "Kevin meatloaf doner, ![im a gnome](https://i.redd.it/ggfqw7m7vbzz.jpg 'cap') filet mignon ham hock buffalo ribeye cupim hamburger. Ham hock ![smol](https://static.thenounproject.com/png/4778723-200.png 'not smol') doner rump pancetta prosciutto chicken tongue shank ham cupim swine ball tip pig porchetta. Fatback jerky boudin, landjaeger shankle beef picanha salami. Porchetta short ribs pork jowl sausage kevin, pancetta bacon fatback chislic cupim capicola burgdoggen ground round." + '\n' + '> ewtgdsgsdgsg' + '\n\n' + "Porchetta swine pork chop pastrami shank doner jerky fatback. Brisket short loin tri-tip, ham tongue meatloaf filet mignon frankfurter bresaola cow ball tip flank doner."},
                {type: 'blockquote', text: 'i\'m a blockhead or however that meme went'},
                {type: 'codeblock', text: 'im a code,yes'},
            ],
            [
                {type: 'paragraph', text: 'Testestest'},
                {type: 'blockquote', text: 'i\'m a blockhead or however that meme went lol', author: 'test', citeLink: '#', cite: 'testplace'},
                {type: 'codeblock', text: 'im a code,yes'},
            ]
        ]
    })

    const dateObj = new Date(data.date);
    const humanDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });

    // TODO: word count
    const wordCount = 4500;

    // don't forget meta tags or else
</script>

<ArticleHeader/>
<main>
    <article>
        <figure>
            <img src="{data.fig}" alt="{data.figalt}">
            <figcaption>{data.figcap}</figcaption>
        </figure>

        <header class="metablock">
            <h1>
                <span>{data.title}</span>
            </h1>

            <small class="blurb"><span>{data.blurb}</span></small>
            <footer>
                <p>
                    <time datetime={data.date}>{humanDate} ✦&nbsp;</time>
                </p>
                <address>
                    {wordCount}
                    words written by&nbsp;
                    <a rel="author" href={data.authorLink}>
                        {data.author}
                    </a>
                </address>
            </footer>
        </header>

        {#each data.sections as section}
            <section>
                {#each section as contentBlock}
                    <Resolver content={contentBlock}/>
                {/each}
            </section>
        {/each}
    </article>
</main>
<!-- imagine a comment section here -->
<footer>
    <!-- Make these frickers random because of course -->
    <!-- © 2025 Maksiks. Some rights stewed, others sautéed. -->
    <!-- © 2025 Maksiks. All right neglected. It's a dangerous world out there. -->
    <!-- © 2025 Maksiks. My rights are in my reserve. -->
    <!-- © 2025 Maksiks. Reserved the rights to reserve rights. -->
    <!-- © 2077 Maksiks. All rights teleported. -->
    <!-- © 830 BC Maksiks. All rights salted. -->
    <p>© 2025 Maksiks. Some rights chewed, others stored in a jar.</p>
</footer>

<style>
    main {
        & article {
            max-width: 720px;
            width: 100%;
            padding-top: clamp(0.5rem, 1.2vw, 3rem);
            margin: 0 auto;

            & header {
                padding-top: clamp(0.5rem, 1.2vw, 2rem);

                width: 100%;
                display: flex;
                flex-direction: column;

                & h1 {
                    & span {
                        text-transform: capitalize;
                        padding: 5px 5px 0 5px;
                        background-color: var(--accent-color);
                        display: inline;
                        box-decoration-break: clone;

                        font-size: 2.6rem;
                        line-height: 2.9rem;

                        font-weight: bolder;
                        font-family: 'Karla', serif;
                    }
                }

                & .blurb {
                    & span {
                        padding: 5px;
                        background-color: var(--accent-color);
                        display: inline-block;
                        font-size: 1.3rem;

                        font-family: 'Anonymous Pro', serif;
                        font-weight: bolder;
                    }
                }

                & footer {
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    padding: 5px;
                    background-color: color-mix(in oklab, var(--accent-color) 80%, black);
                    font-weight: bolder;

                    & p {
                        & time {
                            font-family: 'Anonymous Pro', serif;
                        }
                    }

                    & address {
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;

                        font-family: 'Anonymous Pro', serif;
                        font-style: normal;

                        & a {
                            cursor: pointer;

                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }


            & figure {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                & img {
                    max-width: 100%;
                }

                & figcaption {
                    margin-top: 10px;
                    color: #555555;
                    font-style: italic;
                    align-self: flex-start;
                }
            }
        }
    }
</style>