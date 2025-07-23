<script lang="ts">
const { children } = $props();
</script>

<header>
    <a href="/">The wild</a>
    <!--    jank-->
    <a href="/admin/editor?clean=true">Editor</a>
    <a href="/admin/dashboard">Dashboard</a>
    <a href="/admin/dashboard/comments">Comments</a>
    <a href="/admin/dashboard/list">Edit/Publish</a>
</header>

{@render children()}

<style>
    header {
        border-bottom: 1px solid;
        box-sizing: border-box;
        display: flex;
        align-content: center;

        height: 7vh;
        & a {
            border-right: 1px solid;
            cursor: pointer;
            padding: 1rem;
        }
    }
</style>