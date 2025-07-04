<script lang="ts">
    import {enhance} from '$app/forms';
    import MarkdownBlock from "$lib/components/ArticleInner/MarkdownBlock.svelte";
    import MarkdownIt from "markdown-it";
    import {md} from "../shared";

    let {form} = $props();

    const autoGrow = (e: InputEvent) => {
        const textarea = e.target as HTMLInputElement;

        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    let text = $state('');
    let parsedHtml = $derived(md.render(text));
</script>

<div class="bg-white"></div>
<div class="bg-img"></div>
<div class="bg-gradient"></div>
<main>
    <h1>No one’s watching. You’re safe here.</h1>
    <form method="POST" action="?/newArticle" use:enhance>
        <div class="write-bloc">
            <textarea name="article" bind:value={text} oninput={autoGrow}></textarea>
            <pre class="rendered">{@html parsedHtml}</pre>
        </div>
        <div class="button-wrap">
            <button>Submit</button>
        </div>
    </form>
</main>

{#if form?.success}
    <p>successfully delivered your thing that you just sent to the server back to you because why would you do this</p>

    <MarkdownBlock content={form?.article}/>
{/if}

<style>
    :global {
        body {
            background: #232323;
        }
    }

    .bg-white {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;

        width: 100vw;
        height: 20vh;

        background: white;
    }

    .bg-img {
        position: absolute;
        z-index: -1;
        top: 20vh;
        left: 0;

        width: 100vw;
        height: 100vh;

        background: url("/img/amazingsunsetfoggy.webp") no-repeat;
        background-size: cover;
    }

    .bg-gradient {
        position: absolute;
        z-index: -1;
        top: 120vh;
        left: 0;

        width: 100vw;
        height: 450px;

        background: url("/img/editor-gradient.png") no-repeat;
        background-size: cover;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-top: 9rem;

        & h1 {
            font-size: 1.6rem;
            font-family: "Comfortaa", sans-serif;
        }

        & form {
            margin-top: 17rem;
            width: 80vw;

            display: flex;
            flex-direction: column;

            & .write-bloc {
                max-width: 2128px;
                width: 100%;
                min-height: 100vh;

                display: flex;
                flex-direction: row;

                & textarea {
                    all: unset;
                    background-color: #fbfafa;
                    opacity: 0.9;
                    border: #737373 1px solid;

                    overflow-wrap: break-word;
                    white-space: pre-wrap;
                    width: 50%;
                    min-height: 100vh;
                    height: auto;
                    box-sizing: border-box;

                    padding: 2rem;

                }

                & .rendered {
                    background-color: white;
                    width: 50%;
                    height: 100%;
                    min-height: 100vh;
                    opacity: 0.9;

                    padding: 2rem;
                    border: #737373 1px solid;
                    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
                }
            }

            & .button-wrap {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;

                width: 100%;
                margin-top: 2rem;

                & button {
                    all: unset;
                    background-color: white;
                    border: black 1px solid;
                    border-radius: 24px;

                    padding: 0.5rem 1rem;
                }
            }
        }
    }
</style>