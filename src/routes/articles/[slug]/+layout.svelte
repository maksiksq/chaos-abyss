<script>
    import ArticleHeader from "$lib/components/ArticleInner/ArticleHeader.svelte";
    import ArticleFooter from "$lib/components/ArticleInner/ArticleFooter/ArticleFooter.svelte";

    let { children } = $props();
</script>

<ArticleHeader/>
{@render children()}
<ArticleFooter/>