<script lang="ts">
    import { enhance } from '$app/forms';
    import MarkdownBlock from "$lib/components/ArticleInner/MarkdownBlock.svelte";

    let { form, whatever } = $props();
</script>

<h1>hi i'm an editor</h1>
<form method="POST" action="?/newArticle" use:enhance>
    <label>Put in the page and sign please:
        <textarea name="article" ></textarea>
    </label>
    <button>Submit</button>
</form>


{#if form?.success}
    <p>successfully delivered your thing that you just sent to the server back to you because why would you do this</p>
    <p>{whatever}</p>

    <MarkdownBlock content={form?.article} />
{/if}