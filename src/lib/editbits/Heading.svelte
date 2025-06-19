<script lang="ts">
    const { content } = $props();
</script>

{#if content.level === '1'}
    <h1>{content.text}</h1>
{:else if content.level === '2'}
    <h2>{content.text}</h2>
{:else if content.level === '3'}
    <h3>{content.text}</h3>
{:else if content.level === '4'}
    <h4>{content.text}</h4>
{:else if content.level === '5'}
    <h5>{content.text}</h5>
{/if}