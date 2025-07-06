<script lang="ts">
    const {home = false} = $props();

    // whatever legal meaning these even have this is All rights reserved just read the license lol
    import {onMount} from "svelte";
    import FooterLinks from "$lib/components/Footer/FooterLinks.svelte";
    import FooterSocials from "$lib/components/Footer/FooterSocials.svelte";

    const copyblurbs = [
        // evil
        `© {year} Maksiks. You thought you could copy? How adorable.`,
        '© {year} Maksiks. This isn’t copyright. This is dominion.',
        '© {year} Maksiks. You may view, but you will not possess.',
        '© {year} Maksiks. What you call “content” is my empire.',
        '© {year} Maksiks. You copied? Fool. Now I copy you.',

        // not evil
        '© {year} Maksiks. All rights reserved.',
        '© {year} Maksiks. All rights buffed. No nerfs today.',
        '© {year} Maksiks. Rights procedurally forgotten.',
        '© {year} Maksiks. All rights autosaved.',
        '© {year} Maksiks. Some rights stewed, others sautéed.',
        "© {year} Maksiks. All rights neglected. It's a dangerous world out there.",
        '© {year} Maksiks. My rights are in my reserve.',
        '© {year} Maksiks. Rights acquired. Loot secured.',
        '© {year} Maksiks. Reserved the rights to reserve rights.',
        '© {year} Maksiks. Some rights chewed, others stored in a jar.',
        '© {year} Maksiks. All rights corrupted. Please insert disk 2.',
        '© {year} Maksiks. All rights reserved. Kept in a labeled jar.',
        '© {year} Maksiks. Reserved a table for two.',
        '© {year} Maksiks. Reserved with complimentary sarcasm.',
        '© {year} Maksiks. All rights vacuum-packed for freshness.',
        '© {year} Maksiks. All rights securely hoarded.',
        '© {year} Maksiks. Rights reserved, pending final boss fight.',
        '© {year} Maksiks. Reserved. Unauthorized duplication will be sarcastically judged.',
        '© {year} Maksiks. All rights tightly packed and gently stacked.',
        '© {year} Maksiks. Rights not available in demo version.',
        '© {year} Maksiks. All rights on lockdown. Key not included.',
        '© {year} Maksiks. All rights reserved. They’re shy.',
        '© {year} Maksiks. All rights reserved. Violation triggers mild disappointment.',
        '© {year} Maksiks. Rights reserved. See Appendix D for moral justification.',
        '© {year} Maksiks. All rights reserved. Resistance is futile.',
        '© {year} Maksiks. All rights reserved. Terms subject to hallucination.',
        '© {year} Maksiks. Rights reserved pursuant to our recent blood pact.',
        '© {year} Maksiks. All rights mine. You merely witnessed them.',
        '© {year} Maksiks. I claimed the rights, and the world bent accordingly.',
        '© {year} Maksiks. The rights are bound to me. Irrevocably.',
        '© {year} Maksiks. All rights sealed within the last page of the grimoire.',
        '© {year} Maksiks. My rights do not negotiate.',
        '© {year} Maksiks. All rights branded with my true name.',
        '© {year} Maksiks. Rights very caffeinated.',
        '© {year} Maksiks. All rights reserved under the secret 28th Amendment: Thou Shalt Not Copy Maksiks.',
        '© {year} Maksiks. To copy or not to copy? Nay, thou shalt not.',
        '© {year} Maksiks. Rights reserved, ye scurvy knave!',
        '© {year} Maksiks. None may claim the rights but the one foretold.',
        '© {year} Maksiks. Rights sealed by Zonai magic. Do not disturb.',
        '© {year} Maksiks. Rights protected by Alma\'s hacker skills.',
        '© {year} Maksiks. You must complete all shrines before touching these rights.',
        '© {year} Maksiks. Niko tried to copy. Niko felt bad.',
        '© {year} Maksiks. Rights reserved. You feel like you’re going to have a bad time.',
        '© {year} Maksiks. The rights are filled with DETERMINATION.',
        '© {year} Maksiks. The rights got absorbed by a dog. Sorry.',
        '© {year} Maksiks. You swing, but the rights parry.',
        '© {year} Maksiks. All rights reserved. This blurb is modded.',
        '© {year} Maksiks. Rights enchanted with Protection IV.',
        '© {year} Maksiks. All rights claimed post-Moon Lord.',
        '© {year} Maksiks. All rights locked behind the 9999G donut.',
        '© {year} Maksiks. Rights tomorrow.', // to the 1 person who gets it without looking at the order of these, this is gold.
        '© {year} Maksiks. The rights are in another biome. And you forgot fuel.',
        '© {year} Maksiks. You tried to copy. The spirits are mildly perturbed.',
        '© {year} Maksiks. You Died. The rights remain.',
        '© {year} Maksiks. One does not simply copy a Lord’s soul.',
        '© {year} Maksiks. All rights guarded by Cerberus. Pet at your own risk.',
        '© {year} Maksiks. Rights earned through death. And a lot of reruns.',
        '© {year} Maksiks. Rights detonated with maximum chuunibyou.',
        '© {year} Maksiks. Megumin cast Explosion on fair use.',
        '© {year} Maksiks. Reincarnated into a copyright holder.',
        '© {year} Maksiks. Roll a crit on every die of a 20d20 to get rights. Good luck.'
    ];

    const rareCopyblurbs = [
        // rare
        '© 3:33 AM Maksiks. Rights sleep-deprived.',
        '© ??? Maksiks. Rights exist out of bounds.',
        '© 1993 Maksiks. Rights DOOMed.',
        '© 1991 Maksiks. Rights discombobulated.',
        '© 1720 Maksiks. Paper rights collapsed.',
        '© 666 Maksiks. Rights protected by demons.',
        '© 8-bit Maksiks. Rights chiptuned.',
        '© 1492 Maksiks. Rights discovered accidentally.',
        '© 1937 Maksiks. Rights entered Mordor.',
        '© -273.15°C Maksiks. Rights frozen solid.',
        '© 1889 Maksiks. All rights impressionistic.',
        '© 33 AD Maksiks. Rights resurrected.',
        '© 404 Maksiks. Rights not found.',
        '© 401 Maksiks. No rights not for you.',
        '© 144p Maksiks. Rights are a little blurry.',
        '© 3025 Maksiks. All rights orbiting.',
        '© 2072/2078 Maksiks. All rights glitched.',
        '© 2077 Maksiks. All rights teleported.',
        '© 199X Maksiks. Some rights pixelated.',
        '© 1683 Maksiks. All rights protected.',
        '© 48 BC Maksiks. All rights fireproofed.',
        '© 2025 BC Maksiks. All rights salted.',
        '© 2025 BC Maksiks. All rights preserved.'
    ]

    let text: string = $state('');

    const selectString = (): string => {
        if (Math.floor(Math.random() * 5) !== 0) {
            const right = copyblurbs[Math.floor(Math.random() * copyblurbs.length)];
            return right !== text ? right : selectString();
        } else {
            const right = rareCopyblurbs[Math.floor(Math.random() * rareCopyblurbs.length)];
            return right !== text ? right : selectString();
        }
    }

    const copyblurbify = (): void => {
        text = selectString().replace('{year}', year);
    }

    const year: string = new Date().getFullYear().toString();

    onMount(() => {
        copyblurbify();
    })
</script>

<footer class="{home ? 'hand-holder' : ''} ">
    <div class="footer-left">
        {#if !home}
            <img class="gem" src="/img/gem.svg" alt="A really cool gemstone encircled by magic tentacles or something">
        {/if}
    </div>
    <div class="footer-mid">
        {#if !home}
            <p>Your attention nourishes the void.</p>
        {/if}
    </div>
    <div class="footer-right">
        <div class="link-bloc">
            <ul class="links">
                <FooterLinks {home}/>
            </ul>
            <ul class="socials">
                <FooterSocials/>
            </ul>
        </div>
        <div class="copy-bloc">
            <button class="copyright-blurb" onclick={copyblurbify} aria-label="Change copyright label">{text}</button>
        </div>
    </div>
</footer>

<style>
    .hand-holder:after {
        content: "";
        position: absolute;
        top: -3rem;
        left: 70%;
        width: 20%;
        height: 1px;
        background: #000000;
    }

    footer {
        font-size: 1.1rem;
        display: flex;
        flex-direction: row;
        width: 100vw;
        height: 68vh;
        overflow-x: clip;
        overflow-y: visible;

        margin-top: 4rem;
        position: relative;

        & .footer-left {
            width: 40%;

            display: flex;
            justify-content: center;
            align-items: center;

            margin-bottom: 3rem;

            & img {
                height: 100%;
                user-select: none;

                &:hover {
                    filter: blur(0.3px);
                    transition: all 0.1s;
                    transform: scale(1.003);
                }
            }
        }

        & .footer-mid {
            display: flex;
            justify-content: center;
            align-items: center;
            width: calc(20% - 1.5vw);

            /* approximate, doesn't actually matter */
            margin-bottom: calc(22.66vh - clamp(0px, 3rem, 4rem));

            & p {
                font-size: 1rem;
                text-align: center;
                font-family: 'Anonymous Pro', sans-serif;
            }
        }

        & .footer-right {
            border-right: 1px solid black;
            margin-right: 1.5vw;

            width: 40%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;

            & .link-bloc {
                display: flex;
                position: relative;
                align-items: center;
                justify-content: center;

                height: 70%;

                padding-right: 4vw;
                padding-top: clamp(0px, 3rem, 4rem);

                /* rip future me trying to make this responsive */

                &::after {
                    content: "";
                    display: block;
                    position: absolute;
                    height: 25vh;
                    width: 10px;
                    border-left: 1px solid black;
                    bottom: 0;
                }

                & .links {
                    padding-right: 4rem;
                }

                & .socials {
                    padding-left: 4rem;
                }

                & ul {
                    list-style-type: none;
                    display: flex;
                    flex-direction: column;

                    :global {
                        & .social, .link {
                            font-size: 1.2rem;
                            padding-bottom: 0.6rem;
                            color: #555555;

                            & a {
                                cursor: pointer;
                            }

                            &:hover {
                                color: black;

                                transition: all 0.1s;
                                transform: scale(1.003);
                            }
                        }

                        & .heading {
                            font-size: 1.7rem;
                            padding-bottom: 0.9rem;
                            color: #000000;
                        }
                    }
                }
            }

            & .copy-bloc {
                border-top: 1px solid black;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                height: 30%;
                width: 120%;

                & .copyright-blurb {
                    all: unset;
                    height: 100%;

                    cursor: pointer;
                    padding-right: 2vw;

                    &:hover {
                        transition: all 0.1s;
                        transform: scale(1.003);
                    }
                }
            }
        }

    }

</style>