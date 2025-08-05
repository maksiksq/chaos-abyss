import {type Actions, error, fail} from "@sveltejs/kit";
import {SECRET_IP_HASH_SALT, SECRET_SUPABASE_SERVICE_ROLE_KEY} from "$env/static/private";
import {createHash} from "node:crypto";
import {PUBLIC_DEV, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {createClient} from "@supabase/supabase-js";

export const prerender = false;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions = {
    consecrate: async ({request, getClientAddress}) => {
        const formData = await request.formData();

        // fake invisible field to prevent spam bots
        const nickname = formData.get('nickname') as string;
        if (nickname) return;

        let email = formData.get('email') as string;
        email = email.trim().toLowerCase();

        if (!emailRegex.test(email)) {
            return fail(400, {success: false, threat: 'Invalid email! Hmmmm...'});
        }

        // getting the user's ip for spam prevention
        const clientIp = getClientAddress() || 'unknown';

        // hashing it so even I can't read or use it even if I wanted to really hard
        const SALT = SECRET_IP_HASH_SALT;

        const hashIP = (ip: string) => {
            return createHash('sha256').update(ip + SALT).digest('hex');
        }

        const hashedIP = hashIP(clientIp);

        // checking if this is waitlist or consecrat- nevermind newsletter
        const lirith = formData.get('lirith') as string === 'true';


        const table = lirith ? 'waitlist' : 'newsletter';

        const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_ROLE_KEY);

        if (clientIp === 'unknown') {
            // if unknown, bottleneck it to 300 just in case
            // not that i'm gonna have that many users with a secure vpn
            // or something but still

            const {count: unCount, error: selError} = await supabase
                .from(table)
                .select('*', {count: "exact", head: true})
                .eq('hashed_ip', 'unknown');

            if (selError) {
                if (PUBLIC_DEV) {console.log(error)}

                return fail(400, {success: false, threat: 'Something went wrong!'});
            }

            const unCountZeroed = unCount || 0;

            if (unCountZeroed > 300) {
                return fail(400, {success: false, threat: 'Something went wrong? Are you per chance behind a proxy?'});
            }
        } else {
            // checking if IP was used more than 6 times
            const {count, error: selError} = await supabase
                .from(table)
                .select('*', {count: "exact", head: true})
                .eq('hashed_ip', hashedIP);

            if(selError) {
                if (PUBLIC_DEV) console.error(selError);
                return fail(400, {success: false, threat: 'Oh no! Something went wrong! Try again!'});
            }

            const ipCountZeroed = count ?? 0;

            if (ipCountZeroed > 6) {
                return fail(400, {success: false, threat: 'Oh no! something went wrong! (using a VPN?)'});
            }
        }

        // adding the user to the waitlist/newsletter if everything is ok
        const {error: inError} = await supabase
            .from(table)
            .insert({email: email, hashed_ip: hashedIP})
            .select()
            .single();

        if(inError) {
            if (PUBLIC_DEV) console.error(inError);
            if (inError.code === '23505') {
                const {data, error: selError} = await supabase
                    .from(table)
                    .select('subscribed')
                    .single();

                if (selError) {
                    if (PUBLIC_DEV) console.error(selError);
                    return fail(400, {success: false, threat: "Failed subscription check (OH NO)"});
                }

                if (data?.subscribed === false) {
                    return {success: true, threat: 'Successfully signed you back up. Welcome back!.'};
                }

                return fail(400, {success: false, threat: "You already signed up for it!"});
            }
            return fail(400, {success: false, threat: 'Oh no! Something went wrong! Try again!'});
        }



        console.log(`Successfully signed ${email} up for the newsletter`);
        return {success: true, threat: 'Signed up successfully! Thx! Stay tuned.'};
    }
} satisfies Actions;
