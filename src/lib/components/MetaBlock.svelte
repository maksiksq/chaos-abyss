<script>
    import {timestamptzToHumanDate} from "$lib/utils/timestamptzToHumanDate.js";

    const {
        title = '',
        blurb = '',
        date = '',
        lastEdit = '',
        wordcount = 0,
        authorLink = '',
        accent = '',
        author = ''
    } = $props();

    const humanDate = $state(timestamptzToHumanDate(date));
    const humanLastEdit = $state(timestamptzToHumanDate(lastEdit));

    // I kind of remath deep accent down below but sure, let it be self-sufficient.
    // maybe it will grow some algae eventually
</script>
<header class="metablock">
    <h1>
        <!-- inline styles are fallbacks for nojs-->
        <!-- also lighthouse doesn't see font-size with nested selector
         or for some other reason -->
        <span style={`background-color: ${accent}, font-size: 2rem`}>{title}</span>
    </h1>

    <small class="blurb"><span style={`background-color: ${accent}`}>{blurb}</span></small>
    <footer style={`background-color: color-mix(in hsl, ${accent} 93%, black);`}>
        <div class="databloc">
            <time datetime={humanDate}>{humanDate} {(lastEdit !== date && !!lastEdit) ? `| upd. ${humanLastEdit}` : ''}
                ✦&nbsp;
            </time>
            <address>
                <p>
                    {wordcount}
                    words written by
                </p>
                <a rel="author" href={authorLink}>
                    {author}
                </a>
            </address>
        </div>
    </footer>
</header>

<style>
    header {
        padding-top: clamp(0.5rem, 1.2vw, 2rem);

        width: 100%;
        display: flex;
        flex-direction: column;

        & h1 {
            font-size: 2rem;
            & span {
                padding: 0 5px 5px 5px;
                background-color: var(--accent-color);
                display: inline;
                box-decoration-break: clone;

                font-size: 2.6rem;
                line-height: 3.1rem;

                font-weight: bolder;
                font-family: 'Karla', sans-serif;

                @media (max-width: 768px) {
                    font-size: 1.6rem;
                    line-height: 2.5rem;
                }
            }
        }

        & .blurb {
            & span {
                margin-top: 0;
                padding: 5px;
                background-color: var(--accent-color);
                display: inline-block;
                font-size: 1.3rem;

                font-family: 'Anonymous Pro', sans-serif;
                font-weight: bolder;

                @media (max-width: 768px) {
                    font-size: 1.1rem;
                }
            }
        }

        & footer {
            display: flex;
            flex-direction: row;
            align-items: center;

            padding: 5px;
            background-color: color-mix(in hsl, var(--accent-color) 93%, black);
            font-weight: bolder;

            @media (max-width: 768px) {
                font-size: 1rem;
                margin-top: 0.3rem;
            }

            & .databloc {
                width: 100%;

                & time {
                    font-family: 'Anonymous Pro', sans-serif;
                }

                & address {
                    display: inline;

                    font-family: 'Anonymous Pro', sans-serif;
                    font-style: normal;

                    & * {
                        display: inline;
                        font-family: 'Anonymous Pro', sans-serif;
                        font-style: normal;
                    }

                    & a {
                        cursor: pointer;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }


        }
    }
</style>