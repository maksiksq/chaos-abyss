<script lang="ts">
    import { page } from "$app/state";
    let { children } = $props();

    const metadata = $derived(page.data?.metadata ?? []);
</script>

<svelte:head>
    <title>{page.data.title ?? 'Chaos Abyss'}</title>
    {#each metadata as meta}
        <meta {...meta} />
    {/each}
</svelte:head>

{@render children()}