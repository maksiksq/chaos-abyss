<script lang="ts">
    import Heading from "$lib/editbits/Heading.svelte";
    import Paragraph from "$lib/editbits/Paragraph.svelte";
    import Blockquote from "$lib/editbits/Blockquote.svelte";
    import Codeblock from "$lib/editbits/Codeblock.svelte";
    import Image from "$lib/editbits/Image.svelte";

    const { content } = $props();
</script>

{#if content.type === 'heading'}
    <Heading {content} />
{/if}
{#if content.type === 'paragraph'}
    <Paragraph {content} />
{/if}
{#if content.type === 'blockquote'}
    <Blockquote {content} />
{/if}
{#if content.type === 'codeblock'}
    <Codeblock {content} />
{/if}
{#if content.type === 'image'}
    <Image {content} />
{/if}
