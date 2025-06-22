<script lang="ts">
    import Paragraph from "$lib/editbits/MarkdownBlock.svelte";
    import Arbitrary from "$lib/editbits/Arbitrary.svelte";

    const { content } = $props();
</script>

{#if content.type === 'paragraph'}
    <Paragraph {content} />
{/if}
{#if content.type === 'arbitrary'}
    <Arbitrary {content} />
{/if}

