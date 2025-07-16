import type { LayoutServerLoad } from '../../.svelte-kit/types/src/routes'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
    const { session } = await safeGetSession();
    return {
        session,
        cookies: cookies.getAll(),
    }
}