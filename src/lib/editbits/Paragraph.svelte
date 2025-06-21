<script lang="ts">
    const { content } = $props();
</script>

<pre>{content.text}</pre>

<style>
    /* TODO: paragraph style */
    pre {
        text-wrap: wrap;
    }
</style>