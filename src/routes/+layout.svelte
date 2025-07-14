<script lang="ts">
    import {page} from "$app/state";

    let {children} = $props();

    let {meta} = $derived(page.data);
    $effect(() => {
        if (!meta) {
            console.error("Maksiks: No meta info found for page! YOU'VE DISTRIBUTED THE SEO GODS");
        }
    })


    let metasNamed = $derived(meta?.metaNamed);
    let metasProperty = $derived(meta?.metaProperty);
</script>

<svelte:head>
    <title>{meta?.title ?? 'Chaos Abyss'}</title>
    {#if meta}
        <!-- !!! -->
        {#if meta.noindex}
            <meta name="robots" content="noindex, follow">
        {:else }
            <meta name="robots" content="index, follow" />
        {/if}

        {#each metasNamed ?? [] as meta}
            <meta name={meta.name} content={meta.content}/>
        {/each}
        {#each metasProperty ?? [] as meta}
            <meta property={meta.property} content={meta.content}/>
        {/each}

        {#if meta.canonUrl}
            <link rel="canonical" href={meta.canonUrl}>
        {/if}

        {#if meta.jsonLD}
            {@html `<script type="application/ld+json">${JSON.stringify(meta.jsonLD)}</script>`}
        {/if}
    {/if}
</svelte:head>


{@render children()}