<script lang="ts">
    import {applyAction, enhance} from "$app/forms";

    let text = $state();

    const { data } = $props();

    let associate = $state(data.associate ?? '');

    const title = data.title ?? "Title";
    const fig = data.fig ?? "https://ik.imagekit.io/maksiks/moth.png?tr=w-460";
    const figalt = data.figalt ?? "An article figure";
    const INITIAL =
        `
<p>If you're seeing this, I forgot to add text to this one oh no </p>
<p>A fresh, new article just came out on Chaos Abyss! Go check it out. 👀</p>
<h2>${title}</h2>
<img width="460" src="${fig}" alt="${figalt}">
        `

    // TODO: HANDLE THE JWT FOR UNSUBSCRIBE
    //     <small style="color: gray">This one's no good for replies, contact me at maksiks.touch@gmail.com instead.</small><br>
    // <small><a style="color: gray" href="https://www.chaos-abyss.com/api/unsubscribe?jwt=${jwt}&lirith=true">unsubscribe</a></small>

    let confirm = $state(0);
    let sent = $state(false);
</script>

<main>
    <h1>
        Newsletter to your heart's content:
    </h1>
    <p>
        Whatever you write here will be sent to random people. Don't write anything weird.
    </p>
    <form method="POST" action="/admin/dashboard/sletter/send" use:enhance={({cancel}) => {
        confirm += 1;
        if (confirm < 1) cancel();

        return async ({ result, update }) => {
            if (result) {sent = true}

            await applyAction(result);
        };
    }}>
        <textarea name="text" id="text" bind:value={text}>
        {INITIAL}
        </textarea>
        <label>
            <select name="associate" id="associate" bind:value={associate}>
                {#each data.slugs as slug (slug)}
                    <option>{slug.slug}</option>
                {/each}
            </select>
        </label>
        <p>Unsubscribe text and "contact me elsewhere" is handled in-code separately (it needs to math the jwt)</p>
        {#if confirm === 1}
            <p class="warning">
            WARNING: THEY WILL SEE IT, ARE YOU ABSOLUTELY SURE?
            </p>
        {/if}
        {#if sent}
            <p>
                Sent!
            </p>
        {/if}
        <button type="submit">{confirm === 1 ? 'Yup!' : 'Send'}</button>
    </form>
</main>

<style>
    .warning {
        color: #ff1f1f;
        font-weight: bold;
    }

    main {
        width: 100vw;
        margin-top: 2rem;
        padding: 0 0 1rem 1rem;

        & p {
            margin-top: 1rem;
        }

        & form {
            display: flex;
            flex-direction: column;

            padding-top: 1rem;

            & textarea {
                width: 50%;
                height: 45vh;
            }

            & button {
                all: unset;
                cursor: pointer;
                margin-top: 1rem;
                width: 3rem;
                border-radius: 16px;
                padding: 0.4rem 4rem;
                color: white;
                background-color: black;
            }

            & select {
                margin-top: 1rem;
            }
        }
    }
</style>