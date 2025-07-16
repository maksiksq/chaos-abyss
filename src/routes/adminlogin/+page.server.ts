import {getClient} from "$lib/utils/getSupabaseClient";
import {type Actions, fail, redirect} from "@sveltejs/kit";

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        const supabase = getClient();

        if (!email || !password) {
            return fail(400, {email, missing: true});
        }

        const { data: session, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            return fail(400, {email, incorrect: true});
        }

        return redirect(303, '/admin/editor');
    }
} satisfies Actions;