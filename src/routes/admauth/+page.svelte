<script lang="ts">
    import {enhance} from '$app/forms';

    let {form} = $props();
</script>
<main>
    <form method="POST" action="?/login" use:enhance>
        <label for="email">Login</label>
        <input name="email" id="email" type="email">
        <label for="password">Password</label>
        <input name="password" id="password" type="password">
        <button type="submit" id="login">Login</button>
        {#if form?.skillIssue}<p class="error">Sussy. Nevermind random scumbag.</p>{/if}
    </form>
</main>



<style>
    .error {
        margin-top: 1rem;
    }

    main {
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;

        & form {
            display: flex;
            flex-direction: column;

            width: 20%;
            height: 50%;

            & label {
                margin-bottom: 0.1rem;
            }

            & button {
                cursor: pointer;
            }

            & input {
                height: 1.4rem;
                margin-bottom: 1rem;
                cursor: pointer;
            }

            & button {
                background-color: #650978;
                color: white;
            }
        }
    }
</style>