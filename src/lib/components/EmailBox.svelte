<script lang="ts">
    import {flushSync} from "svelte";
    import {enhance} from '$app/forms';
    import {applyAction} from "$app/forms";
    import {invalidate, invalidateAll} from "$app/navigation";

    let {form = null, lirith} = $props();

    let errMsg = $state('');

    $inspect(errMsg)

    $effect(() => {
        errMsg = form?.threat;
    })

    flushSync();
</script>

<div class={`email-box ${lirith ? 'lirith-email-box' : 'consecration-email-box'}`}>
    <!-- consecration img-->
    {#if !lirith}
        <img src="https://ik.imagekit.io/maksiks/Newsletter%20box%20(7).svg" class="consecration-img" role="presentation" alt="newsletter background">
    {/if}
    <div class="cont">
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
            <div class="form-cont">
                <label class="sr-only" for="email">Email</label>
                <input class="email-input" type="text" name="email" id="email" placeholder="Your email">
                <button type="submit">Send</button>
            </div>
        </form>
        {#if errMsg}
            <p role="alert" class="error-success-message">{errMsg}</p>
        {/if}
        <!--consecration-->
        {#if !lirith}
            <p class={`consecration-info-fresh ${errMsg ? 'info-mobile' : ''}`}>Fresh articles delivered to the meetup email. There may be sacrifices but only moderate ones.</p>
            <p class="consecration-pancakes" >And yes the uhm organization does provide free pancakes 🥞 to every member.</p>
        {/if}
        <!--lirith-->
        {#if lirith}
            <p class={`lirith-info ${errMsg ? 'info-mobile' : ''}`}>✦ You'll only get occasional major updates - e.g. release info, significant direction
                changes. No spam in your
                inbox! Only major things, no update logs, no ads, no weekly emails etc. Just the things you need to know before
                it happens.</p>
        {/if}
    </div>
</div>

<style>
    .info-mobile {
        @media (max-width: 768px) {
            margin-top: 0 !important;
        }
    }

    .consecration-email-box {
        background-color: rgba(0, 0, 0, 1);
        background-image: none;

        margin-top: 2rem;
        margin-bottom: 2rem;

        color: white;

        @media (max-width: 768px) {
            background-image: none;
        }

        position: relative;
        &::before {
            content: "";
            position: absolute;
            z-index: -1;
            top: 0;
            left: -50vw;
            width: 150vw;
            height: 100%;
            background-color: #7500bf;
            box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px, rgb(51, 51, 51) 0 0 0 3px;

            @media (max-width: 768px) {
               display: none;
            }
        }

        & .consecration-img {
            position: absolute;
            user-select: none;
            top: 0;
            left: 50%;
            z-index: -1;
            transform: translateX(-50%);
            height: 100%;
            /* what sort of wild fix is that lmao */
            border-right: 1px solid #7500bf;
        }

        & h2 {
            font-size: 2.4rem;
        }

        & .cont {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.8);
            padding: 1rem 2rem;

            & .error-success-message {
                color: #ff6767;
            }

            & p {
                padding-top: 1.2rem;
            }

            & .email-box-form {
                margin-top: 1rem;

                & .email-input {
                    color: white;
                    border-bottom: 1px solid white !important;
                }

                & .email-input::placeholder {
                    color: rgba(255, 255, 255, 0.77);
                }

                & button {
                    color: black !important;
                    background-color: white !important;
                }
            }

            & .consecration-info-fresh {
                @media (max-width: 768px) {
                    margin-top: 4rem;
                }
            }
        }
    }

    .lirith-email-box {
        background-color: rgba(239, 239, 243, 0.6);
        background-image: url("https://ik.imagekit.io/maksiks/Lirith%20plug%20(8).svg");
        border: 1px solid black;

        margin-top: 1rem;
        margin-bottom: 1rem;

        @media (max-width: 768px) {
            background-image: url("https://ik.imagekit.io/maksiks/Lirith%20plug%20mobile%20(1).svg");
            filter: blur(0.1px);
        }

        & .cont {
            & .email-box-form {
                & button {
                    background-color: #1f2020 !important;
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

                @media (max-width: 768px) {
                    margin-top: 4rem;
                }
            }
        }
    }

    .name-label {
        & input {
            display: none;
        }
    }

    .email-box {
        box-sizing: border-box;
        padding: 1rem;
        background-size: cover;

        & .cont {
            & .error-success-message {
                @media (max-width: 768px) {
                    margin-top: 4rem;
                }
            }

            & .email-box-form {
                display: flex;
                height: 2rem;
                margin-bottom: 1rem;

                & .form-cont {
                    display: flex;
                    width: 100%;

                    @media (max-width: 768px) {
                        flex-direction: column;
                    }

                    & .email-input {
                        background-color: transparent;
                        border: 0;
                        border-bottom: 1px solid black;
                        width: 70%;

                        @media (max-width: 768px) {
                            width: 100%;
                        }
                    }

                    & .email-input::placeholder {
                        font-size: 0.9rem;
                    }

                    & button {
                        width: 30%;
                        all: unset;
                        cursor: pointer;
                        color: white;
                        padding: 0.5rem 4rem;
                        margin: 0.1rem 0.1rem 0 3rem;
                        border-radius: 32px;

                        @media (max-width: 768px) {
                            display: flex;
                            justify-content: center;
                            padding: 0.5rem 0;
                            margin: 1.5rem 0 0 0;
                            width: 100%;
                        }
                    }
                }
            }

            & h2 {
                margin-top: 0;
            }
        }
    }
</style>