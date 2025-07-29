<script>
    import {page} from "$app/state";

    let currentSearchCategory = $derived(!!page.data.cat ? page.data.cat : 'any');

    let {home = false} = $props();
</script>

<header>
    <nav>
        <a href="/" class="logo-link" aria-label="Home">
            <img class="logo" src="/img/calogonotext.svg" alt="Chaos Abyss logo">
        </a>
        <form method="GET" action="/articles" autocomplete="off">
            <label for="query" class="sr-only">Search articles</label>
            <input name="query" id="query" class="search" type="text" autocomplete="off" placeholder="Search..."/>
            <input name="category" id="category" type="hidden" value={currentSearchCategory}/>
            <button class="sr-only">Search</button>
        </form>
        {#if home}
            <svg class="fourth-wall" width="349" height="161" viewBox="0 0 349 161" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="7" width="341" height="154" fill="white"/>
                <line x1="0.65184" y1="27.2778" x2="36.1279" y2="40.8958" stroke="black"/>
                <line x1="53.6541" y1="104.377" x2="66.8656" y2="93.6786" stroke="black"/>
                <line x1="237.336" y1="0.918389" x2="257.644" y2="11.7162" stroke="black"/>
                <line x1="142.375" y1="54.6877" x2="105.911" y2="160.586" stroke="black"/>
                <line y1="-0.5" x2="57" y2="-0.5" transform="matrix(-0.642788 0.766044 0.766044 0.642788 348.641 38)"
                      stroke="black"/>
            </svg>
        {/if}
        <a class="about {home ? 'about-home' : ''}" href="/about">
            About
        </a>
    </nav>
</header>

<style>
    header {
        width: 100%;
        border-bottom: 1px solid black;

        & nav {
            display: flex;
            flex-direction: row;
            align-items: center;

            height: 4rem;

            & .logo-link {
                margin-left: 1vw;
                border-bottom:  1px solid black;
                margin-right: 1vw;
                margin-top: -0.1vw;
                height: 100%;

                display: flex;
                align-items: center;

                & img {
                    width: 100%;
                    height: 3.5rem;

                    @media (max-width: 768px) {
                        width: 3rem;
                        height: 5rem;
                    }

                    @media (max-width: 420px) {
                        height: 3.5rem;
                    }
                }
            }

            & .search {
                margin-right: 2vw;

                padding: 12px 8px 8px 8px;
                background-color: #ededed;
                border: none;
                border-radius: 32px;
                width: 15vw;

                font-size: 0.9rem;

                @media (max-width: 768px) {
                    width: 40vw;
                }
            }

            & .search:placeholder-shown {
                caret-color: transparent;
            }

            & .search::placeholder {
                font-size: 1.1rem;
                color: black;
            }

            & a {
                cursor: pointer;
                font-size: 1.1rem;
            }

            & .fourth-wall {
                align-self: flex-start;
                margin-left: auto;

                @media (min-width: 1680px) {
                    padding-right: 2vw;
                }

                @media (max-width: 768px) {
                    padding-right: 1vw;
                }

                @media (max-width: 420px) {
                    display: none;
                }
            }

            .about-home {
                margin-left: unset !important;

                @media (max-width: 420px) {
                    margin-left: auto;
                }
            }

            & .about {
                padding-left: 1.3rem;
                padding-right: 3vw;
                margin-left: auto;
                position: relative;
                z-index: 99999;

                @media (max-width: 420px) {
                    padding-right: 5vw;
                }
            }
        }
    }
</style>