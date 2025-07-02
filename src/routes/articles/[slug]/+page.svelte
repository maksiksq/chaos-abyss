<script>
    import Article from "$lib/components/Article.svelte";

    let { data } = $props();
    $inspect(data.article);
    $inspect(data.article.title);

</script>

<Article data={data.article}/>