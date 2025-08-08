import {type Actions, fail} from "@sveltejs/kit";
import {SECRET_IP_HASH_SALT, SECRET_SUPABASE_SERVICE_ROLE_KEY} from "$env/static/private";
import {createHash} from "node:crypto";
import {PUBLIC_DEV, PUBLIC_SUPABASE_URL} from "$env/static/public";
import {createClient} from "@supabase/supabase-js";

export const prerender = false;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_UNKNOWN = 300;
const MAX_IP = 6;

export const actions = {
    consecrate: async ({request, getClientAddress}) => {
        const formData = await request.formData();

        // fake invisible field to prevent spam bots
        const nickname = formData.get('nickname') as string;
        if (nickname) return fail(400, {success: false, threat: 'Likely spam detected'});

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
        const lirith = formData.get('lirith')?.toString() === 'true';


        const table = lirith ? 'waitlist' : 'newsletter';

        const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_ROLE_KEY);

        if (clientIp === 'unknown') {
            // if unknown, bottleneck it to 300 just in case
            // not that i'm gonna have that many users with a secure vpn
            // or something but still

            const {count: unCount, error: selError} = await supabase
                .from(table)
                .select('id', {count: "exact", head: true})
                .eq('hashed_ip', 'unknown');

            if (selError) {
                if (PUBLIC_DEV) {console.error(selError)}

                return fail(400, {success: false, threat: 'Something went wrong!'});
            }

            const unCountZeroed = unCount || 0;

            if (unCountZeroed > MAX_UNKNOWN) {
                return fail(400, {success: false, threat: 'Something went wrong? Are you per chance behind a proxy?'});
            }
        } else {
            // checking if IP was used more than 6 times
            const {count, error: selError} = await supabase
                .from(table)
                .select('id', {count: "exact", head: true})
                .eq('hashed_ip', hashedIP);

            if(selError) {
                if (PUBLIC_DEV) console.error(selError);
                return fail(400, {success: false, threat: 'Oh no! Something went wrong! Try again!'});
            }

            const ipCountZeroed = count ?? 0;

            if (ipCountZeroed > MAX_IP) {
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
                    .eq('email', email)
                    .single();

                if (selError) {
                    if (PUBLIC_DEV) console.error(selError);
                    return fail(400, {success: false, threat: "Failed subscription check (OH NO)"});
                }

                if (data?.subscribed === false) {
                    return {success: true, threat: 'Successfully signed you back up. Welcome back!'};
                }

                return fail(400, {success: false, threat: "You already signed up for it!"});
            }
            return fail(400, {success: false, threat: 'Oh no! Something went wrong! Try again!'});
        }



        console.log(`Successfully signed ${email} up for the newsletter`);
        return {success: true, threat: 'Signed up successfully! Thx! Stay tuned.'};
    }
} satisfies Actions;

export const load = ({url}) => {
    // should've done this for every other page
    // ever

    const title = "Newsletter";
    const desc = "Subscribe for the Chaos Abyss newsletter, get an email every time a new article comes out.";
    const link = "https://www.chaos-abyss.com/newsletter";

    return {
        meta: {
            title: title,
            canonUrl: link,
            metaNamed: [
                { name: "description", content: desc },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: title },
                { name: "twitter:description", content: desc },
                { name: "twitter:image", content: "https://www.chaos-abyss.com/img/ogimg.png" }
            ],
            metaProperty: [
                { property: "og:type", content: "website" },
                { property: "og:locale", content: "en_US" },
                { property: "og:title", content: title },
                { property: "og:description", content: desc },
                { property: "og:url", content: url.href },
                { property: "og:image", content: "https://www.chaos-abyss.com/img/ogimg.png" }
            ],
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": title,
                "url": link,
                "description": desc,
                "publisher": {
                    "@type": "Organization",
                    "name": "Chaos Abyss",
                    "url": "https://www.chaos-abyss.com",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.chaos-abyss.com/img/ogimg.png"
                    }
                },
                "potentialAction": {
                    "@type": "SubscribeAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://www.chaos-abyss.com/newsletter"
                    }
                }
            }
        }
    };
};