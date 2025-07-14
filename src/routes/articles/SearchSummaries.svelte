<script>
    import {timestamptzToHumanDate} from "$lib/utils/timestamptzToHumanDate.js";

    const capitalize = s => s.replace(/\b\w/g, c => c.toUpperCase());
    const {data, fromSearch = false} = $props();
</script>
{#each data.summaries as summary}
    <li>
        <article class="mobile-article" style={fromSearch ? `border-left: 5px solid ${summary.accent}; padding-left: 1rem;` : ''}>
            <a href={`articles/${summary.category}/${summary.slug}`}>
                <img src={summary.fig} alt={summary.figalt} loading="lazy" />
                <h4>{summary.title}</h4>
                <p class="blurb">{summary.blurb}</p>
                <p class="info"><span>{timestamptzToHumanDate(summary.date)}</span> <span>✦ {capitalize(summary.category)}</span>
                    {#if summary.commentCount}
                                            <span>
                                                &nbsp;✦
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                                                <path
                                                        fill="#000000"
                                                        d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
                                            </svg>
                                            <span class="comment-count">
                                                {summary.commentCount}
                                            </span>
                                            </span>
                    {/if}
                </p>
            </a>
        </article>
    </li>
{/each}
<style>
    .mobile-article {
        @media (max-width: 768px) {
            & a {
                display: flex;
                flex-direction: column;
                padding-top: 1rem;

                & h4 {
                    margin-left: 0;
                    margin-top: 1rem;
                }

                & .blurb {
                    margin-left: 0;
                    margin-top: 0.2rem;
                }
            }
        }
    }

    li {
        & article {
            & a {
                cursor: pointer;
                display: grid;
                grid-template-columns: 40% 1fr;
                grid-template-rows: auto;

                margin-bottom: 1.4rem;
                height: auto;

                & img {
                    max-width: 100%;
                    height: auto;
                }

                & h4, .blurb {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    line-clamp: 2;
                    margin-left: 1rem;
                }

                & h4 {
                    line-height: 1.2;
                    max-height: calc(1.2em * 2);
                    font-family: Comfortaa, sans-serif;
                    font-weight: bolder;
                    font-size: 1rem;
                }

                & .blurb {
                    line-height: 1.2;
                    max-height: calc(1.2em * 2);
                }

                & img {
                    border-radius: 4px;
                    grid-row: span 2;
                    width: 100%;
                }

                & .info {
                    grid-column: span 2;
                    margin-top: 0.7rem;
                    padding-top: 0.3rem;

                    line-height: 1.2;
                    height: 1.2em;
                    border-top: 1px solid black;

                    & svg {
                        margin-left: clamp(0.1rem, 0.4vw, 1vw);
                        display: inline-block;
                        vertical-align: middle;
                        width: 0.8rem;
                        transform: scaleX(-1);
                    }

                    & .comment-count {
                        margin-left: clamp(0.1rem, 0.2vw, 1vw);
                    }
                }
            }
        }
    }
</style>