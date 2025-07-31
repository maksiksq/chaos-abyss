<script lang="ts">
    import {onMount} from "svelte";

    const { home = false, contact = false, about = false } = $props();

    let links = $state([
        {
            text: 'Home',
            link: '/',
        },
        {
            text: 'Articles',
            link: '/articles',
        },
        {
            text: 'About',
            link: '/about',
        },
        {
            text: 'Contact',
            link: '/contact',
        }
    ]);

    let linksCurrent: { text: string; link: string; }[] = $state(links);

    onMount(() => {
        if (home) {
            linksCurrent = links.filter(e => e.text !== 'Home');
        }
        if (contact) {
            linksCurrent = links.filter(e => e.text !== 'Contact');
        }
        if (about) {
            linksCurrent = links.filter(e => e.text !== 'About');
        }
    })


</script>

<li class="heading">
    Links
</li>
{#each linksCurrent as link (link.link)}
    <li class={`link li-${link}`}>
        <a href={link.link}>
            {link.text}
        </a>
    </li>
{/each}
