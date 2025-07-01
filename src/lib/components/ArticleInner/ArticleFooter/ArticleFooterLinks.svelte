<script lang="ts">
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
</script>

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
