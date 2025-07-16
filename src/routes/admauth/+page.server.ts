import {getClient} from "$lib/utils/getSupabaseClient";
import {type Actions, fail, redirect} from "@sveltejs/kit";

export const actions = {
    login: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.error(error)
            redirect(303, '/admauth/error')
        } else {
            redirect(303, '/admin/editor')
        }
    },
} satisfies Actions;