<script lang="ts">
    import {goto} from "$app/navigation";
    import {currentContent, currentDate, currentDetails} from "../../../shared.svelte.js";

    const {data} = $props();

    const handleEdit = (article: any) => {
        currentDetails.details = article;
        currentContent.content = article.contentmd;
        currentDate.date = article.date;
        console.log(article.date);
        goto('/admin/editor');
    }
</script>

<main>
    <h1>At your service!</h1>
    <div>
        {#each data.articles as article}
            <div class="article">
                <p>{article.title}</p>
                <button class="edit" onclick={() => {handleEdit(article)}}>Edit</button>
            </div>
        {/each}
    </div>
</main>