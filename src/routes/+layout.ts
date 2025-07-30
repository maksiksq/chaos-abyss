import {createBrowserClient, createServerClient, isBrowser} from "@supabase/ssr";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {getBrowserClient} from "$lib/utils/getSupabaseBrowserClient";

// Supabase SvelteKit example basically:
// https://supabase.com/docs/guides/auth/server-side/sveltekit

export const load = async ({ data, depends, fetch }: {data: any, depends: any, fetch: any}) => {
    depends('supabase:auth');

    const supabase = isBrowser()
        ? getBrowserClient()
        : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                fetch,
            },
            cookies: {
                getAll() {
                    return data.cookies;
                }
            }
        })

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const {
        data: { user },
    } =  await supabase.auth.getUser();

    return { session, supabase, user };
}