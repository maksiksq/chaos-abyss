<script>
    const {adjacent} = $props();

    const previous = adjacent.previous;
    const next = adjacent.next;
    $inspect(previous, next)
</script>

<footer class="endblock">
    <div class="previous-article">
        {#if previous.slug}
            <a href="/articles/{previous.slug}">&lt; Previous article <br>
                <span>{previous.title}</span>
            </a>
        {:else}
            <p>{previous.title}</p>
        {/if}

    </div>
    <div class="next-article">
        {#if next.slug}
            <a href="/articles/{next.slug}">Next article &gt;<br>
                <span>{next.title}</span>
            </a>
        {:else}
            <p>{next.title}</p>
        {/if}
    </div>
</footer>

<style>
    .endblock {
        margin-top: clamp(10px, 6rem, 6rem);

        & div {
            width: 100%;
            display: flex;

            & a {
                all: unset;
                cursor: pointer;

                & span {
                    font-size: 1.1rem;
                }
            }
        }

        & .next-article {
            margin-top: clamp(10px, 2.5rem, 2.5rem);
            display: flex;
            justify-content: flex-end;

            & a, p {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
        }
    }
</style>