<script lang="ts">
    import {enhance} from '$app/forms';
    import MarkdownBlock from "$lib/components/MarkdownBlock.svelte";
    import {md} from "../../shared";
    import {onDestroy, onMount} from "svelte";

    let {form} = $props();

    const autoGrow = (e: Event) => {
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

    // sidebar
    let sidebar = $state(false);

    const toggleSidebar = (e: KeyboardEvent) => {
        if (e.key === '/' && e.ctrlKey) {
            e.preventDefault();
            sidebar = !sidebar;
        }
    }
</script>

<svelte:head>
    <title>Editor</title>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>
<svelte:body bind:this={body}/>
<svelte:window onkeydown={toggleSidebar}/>

<div class="bg-white"></div>
<div class="bg-img"></div>
<div class="bg-gradient"></div>

<button class="burger" aria-label="Sidebar burger" onclick={() => sidebar = !sidebar}
        onkeydown={toggleSidebar}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
    </svg>
</button>
<aside class="sidebar {sidebar ? 'open' : 'closed'}">
</aside>
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

    .burger {
        all: unset;

        position: fixed;
        z-index: 99999;
        top: 1vw;
        right: 1vw;

        cursor: pointer;
        opacity: 50%;

        width: 1rem;
        height: 1rem;
        aspect-ratio: 1/1;

        & svg {
            width: 100%;
        }
    }

    .closed {
        right: -20vw;
    }

    .open {
        right: 0;
    }

    .sidebar {
        position: fixed;
        z-index: 99998;
        width: 20vw;
        height: 100vh;
        background: white;
        opacity: 0.95;
        border-left: 1px solid black;

        transition: right 0.1s ease-in;
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