import {getClient} from "$lib/utils/getSupabaseClient";

export const load = async () => {
    const supabase = getClient();

    const { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });

    return {articles};
}
