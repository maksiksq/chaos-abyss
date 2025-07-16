import {type Actions, fail, redirect} from "@sveltejs/kit";

export const actions = {
    login: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            return fail(400, {email, skillIssue: true})
        } else {
            redirect(303, '/admin/editor')
        }
    },
} satisfies Actions;