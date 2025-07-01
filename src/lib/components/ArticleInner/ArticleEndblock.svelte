<script>
    const previous = $state('aaa');
    const next = $state('bbbbbbbbbbbbbb');

</script>

<footer class="endblock">
    <div class="previous-article">
        <a href="#">&lt; Previous article <br>
            <span>{previous}</span>
        </a>
    </div>
    <div class="next-article">
        <a href="#">Next article &gt;<br>
            <span>{next}</span>
        </a>
    </div>
</footer>

<style>
    .endblock {
        margin-top: clamp(10px, 6rem, 6rem);
        & div {
            width: 100%;
            display: flex;

            & a {
                all:  unset;
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

            & a {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
        }
    }
</style>