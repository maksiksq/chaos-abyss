<script lang="ts">
    import {flushSync} from "svelte";
    import {enhance} from '$app/forms';
    import {applyAction} from "$app/forms";
    import {invalidateAll} from "$app/navigation";

    let {form = null, lirith} = $props();

    let errMsg = $state('')

    $effect(() => {
        errMsg = form?.threat;
    })

    flushSync();
</script>

<div class="email-box">
    <!--consecration-->
    {#if !lirith}
        <h2>
            Pledge yourself.
        </h2>
        <p>Join the cult- I mean, newsletter:</p>
    {/if}
    <!--lirith-->
    {#if lirith}
        <h2>
            Want to know when it comes out?
        </h2>
        <p>Here you can sign up to get updates on Lirith:</p>
    {/if}
    <form method="POST" class="email-box-form" action={`/newsletter?/consecrate`} use:enhance={({formData, cancel}) => {
        invalidateAll();
    const email = formData.get('email');
    if (!email) {errMsg = 'No email provided here.'; cancel()}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // @ts-ignore it is a string
    if (!emailRegex.test(email)) {
        errMsg = 'Invalid email. You sure you entered the correct thing?';
        cancel();
    }

    return async ({ result }) => {
        await applyAction(result);
    }
    }}>
        <input type="hidden" name="lirith" id="lirith" value={lirith}/>
        <label class="d-none name-label">
            <input type="text" name="nickname" id="nickname">
        </label>
        <label class="sr-only" for="email">Email</label>
        <input class="email-input" type="text" name="email" id="email" placeholder="Your email">
        <button type="submit">Submit</button>
    </form>
    {#if errMsg}
        <p role="alert" class="error-success-message">{errMsg}</p>
    {/if}
    <!--consecration-->
    {#if !lirith}
        <p class="consecration-info">Fresh articles delivered to your doorstep.</p>
    {/if}
    <!--lirith-->
    {#if lirith}
        <p class="lirith-info">✦ You'll only get occasional major updates - e.g. release info, significant direction
            changes. No spam in your
            inbox! Only major things, no update logs, no ads, no weekly emails etc. Just the things you need to know before
            it happens.</p>
    {/if}


</div>

<style>
    .name-label {
        & input {
            display: none;
        }
    }

    .email-box {
        box-sizing: border-box;
        margin-top: 1rem;
        margin-bottom: 1rem;
        padding: 1rem;
        background-color: rgba(239, 239, 243, 0.6);
        background-image: url("https://ik.imagekit.io/maksiks/Lirith%20plug%20(8).svg");
        border: 1px solid black;
        background-size: cover;

        @media (max-width: 768px) {
            background-image: url("https://ik.imagekit.io/maksiks/Lirith%20plug%20mobile%20(1).svg");
            filter: blur(0.1px);
        }

        & .email-box-form {
            display: flex;
            height: 2rem;
            margin-bottom: 1rem;

            & .email-input {
                background-color: transparent;
                border: 0;
                border-bottom: 1px solid black;
                width: 75%;
            }

            & .email-input::placeholder {
                font-size: 0.9rem;
            }

            & button {
                width: 25%;
                all: unset;
                cursor: pointer;
                color: white;
                background-color: #1f2020;
                padding: 0.5rem 3rem;
                margin: 0.1rem 0.1rem 0 1rem;
                border-radius: 32px;
            }
        }

        & .lirith-info {
            margin-top: 1rem;
            padding: 0.7rem;
            color: #ffffff;

            background-color: rgba(0, 0, 0, 0.75);
            border: 1px solid black;
            position: relative;
            z-index: 10;
        }

        & h2 {
            margin-top: 0;
        }
    }
</style>