<script lang="ts">
    const {content} = $props();
</script>

<div>
    <blockquote cite={content.citeLink}>{content.text}</blockquote>
    <p>{content.author}</p>
    <cite>{content.cite}</cite>
</div>

<style>
    /* TODO: blockquote style */
</style>