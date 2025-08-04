import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
    // @ts-ignore type issue, it seems to work
    const { session } = await parent();

    if (!session) {
        throw redirect(303, '/admauth');
    }

    return {};
};