<header>
    <nav>
        <a href="#" class="logo-link" aria-label="Home">
            <img src="/img/logo.png" alt="logo">
        </a>
        <input class="search" type="text" placeholder="Search..."/>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            About
        </a>
    </nav>
</header>

<style>
    header {
        width: 100%;

        border: 1px solid black;


        & nav {
            display: flex;
            flex-direction: row;
            align-items: center;

            height: 4rem;

            & .logo-link {
                margin-left: 1vw;
                margin-right: 2vw;
                height: 32px;

                & img {
                    height: 2rem;
                }
            }

            & .search {
                margin-right: 2vw;

                padding: 12px 8px 8px 8px;
                background-color: #e1e1e1;
                border: none;
                border-radius: 32px;
                width: 9vw;
            }

            & .search::placeholder {
                font-size: 1.1rem;
                color: black;
            }

            & a {
                font-size: 1.1rem;
            }
        }

    }
</style>