<script lang="ts">
    import {enhance} from '$app/forms';
    import MarkdownBlock from "$lib/components/MarkdownBlock.svelte";
    import {md} from "../../shared";
    import {onDestroy, onMount} from "svelte";

    let {form} = $props();

    const autoGrow = (e: Event) => {
        // weird types, idk how to manage this
        // @ts-ignore
        const textarea = e.target as HTMLInputElement;

        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    let text = $state('');

    const parsedHtml = $derived(md.render(text));

    // very lame that you can't do this in css in Svelte right now
    let body: HTMLBodyElement | undefined = $state();

    onMount(() => {
        if (body) {
            body.style.backgroundColor = '#232323';
        }
    })

    onDestroy(() => {
        if (body) {
            body.style.backgroundColor = 'white';
        }
    })
</script>

<svelte:body bind:this={body}/>

<div class="bg-white"></div>
<div class="bg-img"></div>
<div class="bg-gradient"></div>
<main>
    <h1>No one’s watching. You’re safe here.</h1>
    <form method="POST" action="?/newArticle" use:enhance>
        <div class="write-bloc">

            <textarea name="article" bind:value={text} oninput={autoGrow}></textarea>
            <div class="rendered">
                <MarkdownBlock content={parsedHtml}/>
            </div>
        </div>
        <div class="button-wrap">
            <button>Submit</button>
        </div>
    </form>
</main>


{#if form?.success}
    <p>new article created</p>
{/if}

<style>
    :global {
        body {
            overflow-y: hidden;
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

        background: url("/img/editor-gradient.webp") no-repeat;
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

                    max-width: 1000px;
                    margin: 0 auto;

                    padding: 2rem;
                    border: #737373 1px solid;
                    box-shadow: rgba(0, 0, 0, 0.19) 0 10px 20px, rgba(0, 0, 0, 0.23) 0 6px 6px;
                }
            }

            & .button-wrap {
                padding-bottom: 9vh;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;

                width: 100%;
                margin-top: 2rem;

                & button {
                    all: unset;
                    cursor: pointer;
                    background-color: white;
                    border: black 1px solid;
                    border-radius: 24px;

                    padding: 0.5rem 1rem;
                }
            }
        }
    }
</style>