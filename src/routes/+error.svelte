<script lang="ts">
    import '../global.css';
    import { page } from '$app/state';
</script>

<main>
    <div class="bg"></div>
    <h1>{page.status}</h1>
    <small>{page.error?.message}</small>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & .bg {
            position: absolute;
            inset: 0;
            z-index: 0;

            width: 100vw;
            height: 100vh;

            background-image: url("/img/chaos404.webp");
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }
    }

    @media (max-width: 768px) {
        main {
            align-items: flex-start;

            & .bg {
                background-image: url("/img/chaos404-mobile.webp");
            }

            & h1 {
                margin-top: -10vh;
            }

            & small {
                width: 150px;
                word-break: break-word;
            }

            & h1, small {
                position: relative;
                margin-left: 10vw;
                white-space: normal;
                z-index: 1;
                color: white;
                mix-blend-mode: difference;
            }
        }
    }
</style>