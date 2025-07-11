<script lang="ts">
    import {page} from "$app/state";

    let {children} = $props();

    // const metadata = $derived(page.data?.metadata ?? []);
    $inspect('page', page.data)

    let meta = $derived(page.data.meta);
    let metasNamed = $derived(meta.metaNamed);
    let metasProperty = $derived(meta.metaProperty);
</script>

<svelte:head>
    <title>{meta.title ?? 'Chaos Abyss'}</title>
    {#if metasNamed && metasProperty}
        {#each metasNamed as meta}
            <meta name={meta.name} content={meta.content}/>
        {/each}
        {#each metasProperty as meta}
            <meta property={meta.property} content={meta.content}/>
        {/each}
    {/if}

    {#if meta.canonSlug}
        <link rel="canonical" href={`https://chaos-abyss.com/${meta.canonSlug}`}>
    {/if}

    {#if meta.jsonLD}
        {@html `<script type="application/ld+json">${JSON.stringify(meta.jsonLD)}${'<'}/script>`}
    {/if}
</svelte:head>

{@render children()}