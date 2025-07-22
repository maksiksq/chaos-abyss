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
    <div class="articles">
        {#each data.articles as article}
            <div class="article">
                <div class="title">
                    <p>{article.title}</p>
                </div>
                <div class="blurb">
                    <p>{article.blurb}</p>
                </div>
                <div class="info">
                    <p>{article.category}</p>
                </div>
                <div class="buttons">
                    <button class="edit" onclick={() => {handleEdit(article)}}>Edit</button>
                    <button class="visit"
                            onclick={() => {goto(`/articles/${article.category.toLowerCase()}/${article.slug}`)}}>
                        Visit
                    </button>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>

    main {
        margin-top: 1rem;
        margin-left: 1.4rem;

        & .articles {
            & .article {
                display: flex;
                flex-direction: column;

                margin-top: 0.9rem;
                padding-bottom: 0.5rem;

                & div {
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

                    & button {
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

</style>