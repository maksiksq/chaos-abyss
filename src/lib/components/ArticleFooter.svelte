<script lang="ts">

    // whatever legal meaning these even have this is All rights reserved just read the license lol
    import {onMount} from "svelte";

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
        "© {year} Maksiks. All right neglected. It's a dangerous world out there.",
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
        console.log('rights');
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

    //

    const links = [
        {
            text: 'Home',
            link: '#',
        },
        {
            text: 'About',
            link: '#',
        },
        {
            text: 'Contact',
            link: '#',
        }
    ]

    const socials = [
        {
            text: 'Github',
            icon: 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z',
            link: '#',
        },
        {
            text: 'Bluesky',
            icon: 'Github',
            link: '#',
        },
        {
            text: 'Twitter',
            icon: 'Github',
            link: '#',
        }
    ]
</script>

<footer>
    <ul class="links">
        <li class="heading">
            Links
        </li>
        {#each links as link}
            <li class={`link li-${link}`}>
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                    {link.text}
                </a>
            </li>
        {/each}
    </ul>
    <ul class="socials">
        <li class="heading">
            Socials
        </li>
        {#each socials as social}
            <li class={`social so-${social}`}>
                <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d={social.icon}/></svg>
                <a href={social.link} target="_blank" rel="noopener noreferrer">
                    {social.text}
                </a>
            </li>
        {/each}
    </ul>
    <button class="copyright-blurb" onclick={copyblurbify} aria-label="Change copyright label">{text}</button>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: row;
        & ul {
            all: unset;
            display: flex;
            flex-direction: column;

            & li {
                color: #555555;
            }

            & .social {
                display: flex;
                flex-direction: row;
                align-items: center;
                & svg {
                    width: 1.5rem;
                    height: 1.5rem;
                    fill: currentColor;
                }
            }

            & .heading {
                color: #000000;
            }
        }


        & .copyright-blurb {
            all: unset;
            cursor: pointer;

            &:hover {
                opacity: 0.8;
                transform: scale(1.003);
            }
        }
    }

</style>