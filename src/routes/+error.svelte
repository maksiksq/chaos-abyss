<script lang="ts">
    import '../global.css';
    import { page } from '$app/state';
</script>

<main>
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

        background-image: url("/img/chaos404.png");
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>