<script lang="ts">
    import {goto} from "$app/navigation";

    const handleTravelToEditor = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            goto('/admin/dashboard');
        }
    }

</script>

<svelte:window on:keydown={handleTravelToEditor}/>

<h1>press the up arrow on your keyboard</h1>

<style>
</style>