<script>
    import {getClient} from "$lib/utils/getSupabaseClient.js";
    import {redirect} from "@sveltejs/kit";
    import {browser} from "$app/environment";
    import {onMount} from "svelte";


    onMount(async () => {
        const supabase = getClient();

        const { data: session, error } = await supabase.auth.getSession()

        if (error || session.session === null) {
            redirect(303, '/adminlogin');
        }
    })
</script>