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

    figure {
        width: 100%;
        align-items: center;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>