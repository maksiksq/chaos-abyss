<script lang="ts">
    import {goto} from "$app/navigation";
    import {currentContent, currentDate, currentDetails} from "../../../shared.svelte.js";
    import {timestamptzToHumanDate} from "$lib/utils/timestamptzToHumanDate";
    import CategorySelect from "$lib/components/CategorySelect.svelte";

    const {data} = $props();

    const handleEdit = (article: any) => {
        currentDetails.details = article;
        currentContent.content = article.contentmd;
        currentDate.date = article.date;
        console.log(article.date);
        goto('/admin/editor');
    }

    const [drafts, published] = $state(data.articles.reduce(([a, b]: any, article: (typeof data.articles)[number]) => article.category === 'draft' ? [[...a, article], b] : [a, [...b, article]], [[], []]));

    let categoryMap = $state(Object.fromEntries(drafts.map((article: typeof drafts[number]) => [article.uuid, article.category || ''])));
</script>

<main>
    <h1>At your service!</h1>
    <div class="articles">
        <div class="published bloc">
            <h2> PUBLISHED </h2>
            {#each published as article}
                <div class="article">
                    <div class="title">
                        <p>{article.title}</p>
                    </div>
                    <div class="blurb">
                        <p>{article.blurb}</p>
                    </div>
                    <div class="info">
                        <p>Category: {article.category} * Published: {timestamptzToHumanDate(article.date)} * Last Edit: {timestamptzToHumanDate(article.last_edit)}</p>
                    </div>
                    <form class="buttons">
                        <button type="button" class="edit" onclick={() => {handleEdit(article)}}>Edit</button>
                        <a href={`/articles/${article.category.toLowerCase()}/${article.slug}`} type="button" class="visit">
                            Visit
                        </a>
                        <button type="submit" class="draftify">
                            Draftify
                        </button>
                    </form>
                </div>
            {/each}
        </div>
        <div class="drafts bloc">
            <h2> DRAFTS </h2>
            {#each drafts as article}
                <div class="article">
                    <div class="title">
                        <p>{article.title}</p>
                    </div>
                    <div class="blurb">
                        <p>{article.blurb}</p>
                    </div>
                    <div class="info">
                        <p>Select category: <select bind:value={categoryMap[article.uuid]}><CategorySelect /></select>  * Created: {timestamptzToHumanDate(article.creation_date)} * Publish Date: {article.date ? timestamptzToHumanDate(article.date) : 'not yet'} * Last Edit: {timestamptzToHumanDate(article.last_edit)}</p>
                    </div>
                    <form method="POST" class="buttons" action="?/publish">
                        <input type="hidden" name="article" value={JSON.stringify(article)} />
                        <input type="hidden" name="category" value={JSON.stringify(categoryMap[article.uuid])} />
                        <button type="button" class="edit" onclick={() => {handleEdit(article)}}>Edit</button>
                        <a href={`/articles/${article.category.toLowerCase()}/${article.slug}`} type="button" class="visit">
                            Visit
                        </a>
                        <button type="submit" class="publish">
                            Publish
                        </button>
                    </form>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>

    main {
        margin-top: 1rem;
        margin-left: 1.4rem;

        & .articles {
            display: flex;
            & .bloc {
                margin-top: 1rem;
                width: 50%;

                & h2 {
                    font-size: 4rem;
                }

                & .article {
                    display: flex;
                    flex-direction: column;

                    margin-top: 0.9rem;
                    padding-bottom: 0.5rem;

                    & div, form {
                        display: flex;
                        flex-direction: row;
                    }

                    & .title {
                        font-size: 1.2rem;

                        & p {
                            border-bottom: 1px solid black;
                        }
                    }

                    & .blurb {
                        margin-top: 0.4rem;
                    }

                    & .info {
                        margin-top: 0.4rem;
                    }

                    & .buttons {
                        margin-top: 0.9rem;

                        & button, a {
                            all: unset;
                            background-color: rgba(126, 0, 189, 0.4);
                            border: 1px solid black;
                            padding: 0.3rem 2rem;
                            margin-right: 1rem;
                            font-size: 0.9rem;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

</style>