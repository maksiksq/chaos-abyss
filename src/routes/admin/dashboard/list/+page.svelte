<script lang="ts">
    import {goto, invalidate} from "$app/navigation";
    import {enhance} from '$app/forms';
    import {currentContent, currentDate, currentDetails} from "../../../shared.svelte.js";
    import {timestamptzToHumanDate} from "$lib/utils/timestamptzToHumanDate";
    import CategorySelect from "$lib/components/CategorySelect.svelte";

    const {data, form} = $props();

    const handleEdit = (article: any) => {
        currentDetails.details = article;
        currentContent.content = article.contentmd;
        currentDate.date = article.date;
        goto('/admin/editor');
    }

    const separateAndSortDrafts = () => {
        const [localDrafts, localPublished] = data.articles.reduce(([a, b]: any, article: (typeof data.articles)[number]) => article.category === 'draft' ? [[...a, article], b] : [a, [...b, article]], [[], []]);
        const sortedDrafts = localDrafts.sort((a: typeof localDrafts[number], b: typeof localDrafts[number]) => {
            const aDate = a.last_edit;
            const bDate = b.last_edit;

            if (aDate === null && bDate === null) return 0;
            if (aDate === null) return -1;
            if (bDate === null) return 1;

            return new Date(bDate).getTime() - new Date(aDate).getTime();
        });

        return [sortedDrafts, localPublished]

    }

    const [drafts, published] = $derived.by(separateAndSortDrafts);
    const publishedCategories = $derived(published.reduce((acc: Record<string, typeof published[number]>, article: typeof published[number]) => ((acc[article.category] ||= []).push(article), acc), {} as Record<string, typeof published[number][]>));
    const keysAndCategories = $derived(Object.entries(publishedCategories) as [string, typeof published[number][]][])

    // FAKE DERIVED
    // this thing assigns the categories to each select individually
    // (so I don't accidentally publish the wrong thing)
    let categoryMap = $state(Object.fromEntries(drafts.map((article: typeof drafts[number]) => [article.uuid, article.category || ''])));

    // This effect is a workaround to make that thing reactive because for
    // some reason it isn't (My second time having the same issue with
    // Object.fromEntries so that's the issue i think)
    $effect(() => {
        categoryMap = Object.fromEntries(drafts.map((article: typeof drafts[number]) => [article.uuid, article.category || '']))
    })

    //

    let modal = $state('');

    let formEl: HTMLFormElement | null = $state(null);

    const handleLightboxOut = () => {
        formEl = null;
        modal = '';
    }

    const handleModalClick = () => {
        formEl?.submit();
    }

    const handleDraftify = (e: Event) => {
        const target = e.target as HTMLElement;
        formEl = target.parentElement as HTMLFormElement;

        modal = 'This will remove the article from the website, you sure?';
    }

    const handlePublish = (e: Event) => {
        const target = e.target as HTMLElement;
        formEl = target.parentElement as HTMLFormElement;

        modal = 'This will publish the article for everyone to see, you sure?';
    }

    const handleStash = (e: Event) => {
        const target = e.target as HTMLElement;
        formEl = target.parentElement as HTMLFormElement;

        modal = 'This will stash the article to the depths of hell, you sure? Technically accessible through the database still.';
    }
</script>

<main>
    {#if modal}
        <div role="button" tabindex="0" class="lightbox" onclick={handleLightboxOut} onkeydown={handleLightboxOut}>
            <div class="modal">
                <p>{modal}</p>
                <button onclick={handleModalClick}>Yup. That's right.</button>
            </div>
        </div>
    {/if}

    <h1>At your service!</h1>
    {#if form?.threat}
        <p>{form?.threat}</p>
    {/if}
    <div class="articles">
        <div class="published bloc">
            <h2> PUBLISHED </h2>
            {#each keysAndCategories as [categoryName, articles]}
                <h3 class="category-name">{categoryName}</h3>
                {#each articles as article}
                    <div class="article">
                        <div class="title">
                            <p>{article.title}</p>
                        </div>
                        <div class="blurb">
                            <p>{article.blurb}</p>
                        </div>
                        <div class="info">
                            <p>Category: {article.category} * Published: {timestamptzToHumanDate(article.date)} * Last
                                Edit: {timestamptzToHumanDate(article.last_edit)}</p>
                        </div>
                        <div class="clickables">
                            <form method="POST" class="buttons" action="?/draftify"
                                  use:enhance={ () => invalidate('/admin/dashboard/list') }>
                                <input type="hidden" name="uuid" value={JSON.stringify(article.uuid)}/>
                                <button type="button" class="edit" onclick={() => {handleEdit(article)}}>Edit</button>
                                <a href={`/articles/${article.category.toLowerCase()}/${article.slug}`} type="button"
                                   class="visit">
                                    Visit
                                </a>
                                <button type="button" onclick={handleDraftify} class="draftify">
                                    Draftify
                                </button>
                            </form>
                        </div>
                    </div>
                {/each}
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
                        <p>Select category: <select bind:value={categoryMap[article.uuid]}>
                            <CategorySelect/>
                        </select> * Created: {timestamptzToHumanDate(article.creation_date)} * Publish
                            Date: {article.date ? timestamptzToHumanDate(article.date) : 'not yet'} * Last
                            Edit: {timestamptzToHumanDate(article.last_edit)}</p>
                    </div>
                    <div class="clickables">
                        <form method="POST" class="buttons" action="?/publish"
                              use:enhance={ () => invalidate('/admin/dashboard/list') }>
                            <input type="hidden" name="article" value={JSON.stringify(article)}/>
                            <input type="hidden" name="category" value={JSON.stringify(categoryMap[article.uuid])}/>
                            <button type="button" class="edit" onclick={() => {handleEdit(article)}}>Edit</button>
                            <a href={`/articles/${article.category.toLowerCase()}/${article.slug}`} target="_blank" rel="noopener noreffer" type="button"
                               class="visit">
                                Visit
                            </a>
                            <button type="button" onclick={handlePublish} class="publish">
                                Publish
                            </button>
                        </form>
                        <form method="POST" class="buttons stash-form" action="?/stash" use:enhance>
                            <input type="hidden" name="uuid" value={JSON.stringify(article.uuid)}/>
                            <button type="button" onclick={handleStash} class="stash">
                                🗑
                            </button>
                        </form>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    .lightbox {
        position: fixed;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);

        & .modal {
            width: 30vw;
            height: 30vh;
            background-color: white;
            border: 1px solid black;

            box-sizing: border-box;
            padding: 1rem;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            gap: 1rem;

            & p {
                width: 80%;
            }

            & button {
                all: unset;
                background-color: rgba(255, 47, 47, 0.4);
                border: 1px solid black;
                cursor: pointer;
                padding: 1rem 2rem;
            }
        }
    }

    main {
        margin-top: 1rem;
        margin-left: 1.4rem;

        & .articles {
            display: flex;

            & .published {
                & .category-name {
                    padding-top: 0.2rem;
                    font-size: 1.3rem;
                    text-transform: capitalize;
                }
            }

            & .bloc {
                margin-top: 1rem;
                width: 50%;
                box-sizing: border-box;
                padding-right: 7rem;

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

                        & p {
                            line-height: 1.7em;
                        }
                    }

                    & .clickables {
                        & .buttons {
                            margin-top: 0.9rem;

                            & button, a {
                                all: unset;
                                background-color: rgba(47, 255, 81, 0.4);
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
    }

</style>