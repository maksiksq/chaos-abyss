<script lang="ts">
    const {content} = $props();
</script>

<div>
    <blockquote cite={content.citeLink}>
        <p>{content.text}</p>
        <p>{content.author}</p>
        <cite>{content.cite}</cite>
    </blockquote>
</div>

<style>
    /* TODO: blockquote style */
    blockquote {
        float: right;
    }
</style>