<script>
    let {data} = $props();
</script>

<h1> i'm a slug hustler </h1>

<p> here, pick a slug: </p>
<ul>
    {#each data.summaries as {slug, title}}
        <li><a href="/articles/{slug}">{title}</a></li>
    {/each}
</ul>

<style>
    :global {
        html, body {
            overflow-y: hidden;
        }
    }
</style>