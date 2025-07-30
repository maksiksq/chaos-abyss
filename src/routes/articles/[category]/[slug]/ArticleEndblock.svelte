<script>
    const {adjacent} = $props();
</script>

<footer class="endblock">
    <nav>
        <section class="previous-article">
            {#if adjacent.previous.slug}
                <a rel="prev" href="/articles/{adjacent.previous.slugcat}/{adjacent.previous.slug}">&lt; Previous
                    article <br>
                    <span>{adjacent.previous.title}</span>
                </a>
            {:else}
                <p aria-label="No previous article available.">{adjacent.previous.title}</p>
            {/if}
        </section>
        <section class="next-article">
            {#if adjacent.next.slug}
                <a rel="next" href="/articles/{adjacent.next.slugcat}/{adjacent.next.slug}">Next article &gt;<br>
                    <span>{adjacent.next.title}</span>
                </a>
            {:else}
                <p aria-label="No next article available.">{adjacent.next.title}</p>
            {/if}
        </section>
    </nav>
</footer>

<style>
    .endblock {
        margin-top: clamp(10px, 6rem, 6rem);

        & nav {
            & section {
                width: 100%;
                display: flex;

                & a {
                    all: unset;
                    cursor: pointer;

                    @media (max-width: 768px) {
                        width: 100%;
                    }

                    & span {
                        font-size: 1.1rem;

                        @media (max-width: 768px) {
                            border-top: 1px solid black;
                            display: block;
                            padding-top: 0.3rem;
                            margin-top: 0.7rem;
                        }
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

    }
</style>