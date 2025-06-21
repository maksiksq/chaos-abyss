<script lang="ts">
    import markdownit from 'markdown-it';

    const {content} = $props();

    const md = markdownit();
    const parsedText = md.render(content.text, {})
</script>

<p>{@html parsedText}</p>

<style>
    /* TODO: paragraph style */

    p {
        :global {
            table {
                width: 100%;

                margin: 1vw 0 1vw 0;
                border-spacing: 0;

                & td, tr, th {
                    padding: 10px;
                    border: 1px solid black;
                }

                border: 1px solid black;
            }

            a {
                text-decoration: underline;
                cursor: pointer;
            }
        }

    }
</style>