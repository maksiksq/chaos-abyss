<script lang="ts">
    const links = [
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
    ]
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
