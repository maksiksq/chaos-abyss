import {getClient} from "$lib/utils/getSupabaseClient";
import {type Actions, fail} from "@sveltejs/kit";

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        const supabase = getClient();

        const { data: iflog, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (!email || !password) {
            return fail(400, {email, missing: true});
        }

        if (error) {
            return fail(400, {email, incorrect: true});
        }

        console.log(iflog);
        return { success: true };
    }
} satisfies Actions;