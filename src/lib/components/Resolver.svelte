<script lang="ts">
    import Paragraph from "$lib/editbits/MarkdownBlock.svelte";
    import Blockquote from "$lib/editbits/Blockquote.svelte";
    import Codeblock from "$lib/editbits/Codeblock.svelte";
    import Arbitrary from "$lib/editbits/Arbitrary.svelte";

    const { content } = $props();
</script>

{#if content.type === 'paragraph'}
    <Paragraph {content} />
{/if}
{#if content.type === 'blockquote'}
    <Blockquote {content} />
{/if}
{#if content.type === 'codeblock'}
    <Codeblock {content} />
{/if}
{#if content.type === 'arbitrary'}
    <Arbitrary {content} />
{/if}

