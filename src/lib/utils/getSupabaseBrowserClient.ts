import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {createBrowserClient} from "@supabase/ssr";

let supabase: any | null = null;
export const getBrowserClient = () => {
    if (!supabase) {
        supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                fetch,
            }});
    }
    return supabase;
}