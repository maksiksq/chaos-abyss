<script lang="ts">
    import {onMount} from "svelte";

    const { home = false } = $props();

    let links = $state([
        {
            text: 'Home',
            link: '/',
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

    onMount(() => {
        if (home) {
            links = links.filter(e => e.text !== 'Home');
        }
    })


</script>

<li class="heading">
    Links
</li>
{#each links as link}
    <li class={`link li-${link}`}>
        <a href={link.link}>
            {link.text}
        </a>
    </li>
{/each}
