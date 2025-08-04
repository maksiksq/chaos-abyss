<script lang="ts">
    import {goto} from "$app/navigation";

    const handleTravelToEditor = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            goto('/admin/dashboard');
        }
    }

</script>

<svelte:window on:keydown={handleTravelToEditor}/>

<p>1) First try pressing the up arrow on your keyboard (goto)</p>
<p>2) Then trying going through a <a href="/admin/dashboard">link</a> or the url bar</p>

<style>
</style>