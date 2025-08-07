<script>
    let text = $state();

    const { data } = $props();

    let associate = $state(data.associate ?? '');

    const title = data.title ?? "Title";
    const fig = data.fig ?? "https://ik.imagekit.io/maksiks/moth.png?tr=w-460";
    const figalt = data.figalt ?? "https://ik.imagekit.io/maksiks/moth.png?tr=w-460";
    const INITIAL =
        `
<p>This one's all shiny and glittery, to a scary degree. </p>
<p>A fresh, new article just came out on Chaos Abyss! Go check it out. 👀</p>
<h2>${title}</h2>
<img width="460" src="${fig}" alt="${figalt}">
        `

    // TODO: HANDLE THE JWT FOR UNSUBSCRIBE
    //     <small style="color: gray">This one's no good for replies, contact me at maksiks.touch@gmail.com instead.</small><br>
    // <small><a style="color: gray" href="https://www.chaos-abyss.com/api/unsubscribe?jwt=${jwt}&lirith=true">unsubscribe</a></small>
</script>

<main>
    <h1>
        Newsletter to your heart's content:
    </h1>
    <p>
        Whatever you write here will be sent to random people. Don't write anything weird.
    </p>
    <form>
        <textarea name="text" id="text" bind:value={text}>
        {INITIAL}
        </textarea>
        <label>
            <select name="select" id="select" bind:value={associate}>
                {#each data.slugs as slug (slug)}
                    <option>{slug.slug}</option>
                {/each}
            </select>
        </label>
        <p>Unsubscribe text and "contact me elsewhere" is handled in code-separately (it needs a jwt)</p>
        <button type="submit">Send</button>
    </form>
</main>

<style>
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