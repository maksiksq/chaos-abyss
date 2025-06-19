<script lang="ts">
    const { content } = $props();
    // figure
</script>

<figure>
    <img src={content.src} alt="{content.alt}"/>
    <figcaption>
        {content.caption}
    </figcaption>
</figure>

<style>
    /* TODO: image style */
</style>