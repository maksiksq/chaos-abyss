export const load = async ({ locals: { safeGetSession }, cookies }: any) => {
    const { session } = await safeGetSession();
    return {
        session,
        cookies: cookies.getAll(),
    }
}