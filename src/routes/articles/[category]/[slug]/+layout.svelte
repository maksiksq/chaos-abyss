<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";

    let { children } = $props();
</script>

<Header/>
{@render children()}
<Footer/>