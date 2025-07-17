<script>
    import {goto} from "$app/navigation";
    import {currentDetails} from "../../../shared.svelte.js";

    const {data} = $props();

    const handleEdit = () => {
        currentDetails.details = data.articles
        goto('/admin/editor');
    }
</script>

<main>
    <h1>At your service!</h1>
    <main>
        {#each data.articles as article}
            <div class="article">
                <p>{article.title}</p>
                <button class="edit" onclick={handleEdit}>Edit</button>
            </div>
        {/each}
    </main>
</main>