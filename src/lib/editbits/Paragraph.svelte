<script lang="ts">
    import markdownit from 'markdown-it';

    const { content } = $props();

    const md = markdownit();
    const parsedText = md.render(content.text, {})
</script>

<p>{@html parsedText}</p>

<style>
    /* TODO: paragraph style */
    pre {
        text-wrap: wrap;
    }
</style>