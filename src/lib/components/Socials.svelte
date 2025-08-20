<script lang="ts">
    const {socials, fromContact = false} = $props();
</script>

{#if !fromContact}
    <li class="heading">
        Socials
    </li>
{/if}

{#each socials as social (social.text)}
    <li class={`social so-${social.text.toLowerCase()} ${fromContact ? 'inline' : ''}`}>
        <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
        <a href={social.link} target="_blank" rel={`noopener ${fromContact ? "me" : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" class="{social.text === 'Ko-fi' ? 'ko-fi' : ''}" viewBox="0 0 512 512">
                <path d={social.icon}/>
            </svg>
            {social.text}
        </a>
    </li>
{/each}

<style>
    .inline {
        padding-bottom: 1rem;

        &:hover {
            color: black;

            transition: all 0.1s;
            transform: scale(1.003);
        }
    }

    .inline:nth-child(1) {
        margin-top: 1rem;
    }

    .social {
        display: grid;
        flex-direction: row;
        align-items: center;
        cursor: pointer;

        & a {
            display: flex;
            flex-direction: row;
            align-items: center;

            &:hover {
                filter: blur(0.3px);
                transition: all 0.1s;
                transform: scale(1.003);
            }

            & svg {
                width: 1.2rem;
                height: 1.2rem;
                padding-right: 0.5rem;
                fill: currentColor;
            }

            & .ko-fi {
                padding-right: 0.3rem;
                width: 1.4rem;
            }
        }
    }
</style>