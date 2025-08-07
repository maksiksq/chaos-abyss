import {fail} from "@sveltejs/kit";
import {getClient} from "$lib/utils/getSupabaseClient";
import {error as sverror} from "@sveltejs/kit";

export const load = async ({url}) => {
    const title = url.searchParams.get('title');
    const fig = url.searchParams.get('fig');
    const figalt = url.searchParams.get('figalt');
    const associate = url.searchParams.get('associate');

    const supabase = getClient();

    const {data: slugs, error} = await supabase
        .from('articles')
        .select('slug')
    ;

    console.log(slugs)

    if (error) {
        console.error(error);
        sverror(500, "oh fuck")
    }

    return {
        title,
        fig,
        figalt,
        associate,
        slugs
    }
}