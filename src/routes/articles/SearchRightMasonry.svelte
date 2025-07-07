<script lang="ts">
    import SearchSummaries from "./SearchSummaries.svelte";

    let {feats} = $props();
</script>
<section class="feat-seg">
    <h2> Here, pick an article: </h2>
    <div class="cards">
        <!--            why did I name it like that -->
        <!--            it was 1 am but still -->
        {#each feats as feat}
            <div class="card">
                <h3>{feat.name}</h3>
                <ul>
                    <SearchSummaries data={feat}/>
                </ul>
            </div>
        {/each}
    </div>
</section>

<style>
    .feat-seg {
        width: 60%;
        display: flex;
        height: 300vh;
        flex-direction: column;

        & h2 {
            margin-bottom: 1rem;
        }

        & .cards {
            position: sticky;
            top: 0;

            width: 100%;
            gap: 1rem;
            columns: 2;

            & .card {
                break-inside: avoid;
                box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
                background-color: white;
                border-radius: 4px;


                margin-bottom: 0.6rem;

                & h3 {
                    padding: 1rem;
                    border-bottom: 1px solid black;
                }

                & ul {
                    padding: 1rem 1rem 0.3rem 1rem;
                    list-style: none;
                }
            }
        }
    }
</style>