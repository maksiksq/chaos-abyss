<script lang="ts">
    import {applyAction, enhance} from "$app/forms";

    let text = $state();

    const { data, form } = $props();

    let associate = $state(data.associate ?? '');

    const title = data.title ?? "Title";
    const fig = data.fig ?? "https://ik.imagekit.io/maksiks/moth.png?tr=w-460";
    const figalt = data.figalt ?? "An article figure";
    const blurb = data.blurb ?? "Oh no";
    const INITIAL =
        `
<p>If you're seeing this, I forgot to add text to this one oh no </p>
<p>A fresh, new article just came out on Chaos Abyss! Go check it out. 👀</p>
<h2>${title}</h2>
<img width="460" src="${fig}" alt="${figalt}">
<p>${blurb}</p>
        `

    let confirm = $state(0);
    let sent = $state(false);

    // debounce
    let lastSubmit = $state(0);
</script>

<main>
    <h1>
        Newsletter to your heart's content:
    </h1>
    <p>
        Whatever you write here will be sent to random people. Don't write anything weird.
    </p>
    <form method="POST" action="?/send" use:enhance={({cancel}) => {
        const now = Date.now();

        if (now - lastSubmit < 1000) {
            console.warn('Debounced');
            cancel();
            return;
        }

        lastSubmit = now;

         if (!text) {
             console.warn('No text');
            cancel();
            return;
        }

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
                <option value="none" selected>None</option>
                {#each data.slugs as {slug} (slug)}
                    <option value={slug}>{slug}</option>
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
                Sent! On the client!
            </p>
        {/if}
        {#if form?.threat}
            {form?.threat}
        {/if}
        <button type="submit" class={form?.success ? 'd-none' : ''}>{confirm === 1 ? 'Yup!' : 'Send'}</button>
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