import {type Actions, fail} from "@sveltejs/kit";
import {SECRET_IP_HASH_SALT} from "$env/static/private";
import {PUBLIC_DEV} from "$env/static/public";
import {createHash} from "node:crypto";

export const prerender = true;

export const actions = {
    waitlist: async ({request, getClientAddress, locals: {supabase}}) => {
        const formData = await request.formData();

        // fake invisible field to prevent spam bots
        const nickname = formData.get('nickname') as string;
        if (nickname) return;

        let email = formData.get('email') as string;
        email = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

        if (clientIp === 'unknown') {
            // if unknown, bottleneck it to 300 just in case
            // not that i'm gonna have that many users with a secure vpn
            // or something but still
            const {count: unCount, error: selError} = await supabase
                .from('waitlist')
                .select('*', {count: "exact", head: true})
                .eq('hashed_ip', 'unknown');

            const unCountZeroed = unCount || 0;

            if (unCountZeroed > 500) {
                return fail(400, {success: false, threat: 'Something went wrong? Are you per chance behind a proxy?'});
            }
        } else {
            // checking if IP was used more than 6 times
            const {count, error: selError} = await supabase
                .from('waitlist')
                .select('*', {count: "exact", head: true})
                .eq('hashed_ip', hashedIP);

            if(selError) {
                if (PUBLIC_DEV) console.error(selError);
                return fail(400, {success: false, threat: 'Oh no! Something went wrong!'});
            }

            const ipCountZeroed = count ?? 0;

            if (ipCountZeroed > 6) {
                return fail(400, {success: false, threat: 'Oh no! something went wrong! (using a VPN?)'});
            }
        }

        // adding the user to the waitlist if everything is ok
        const {error: inError} = await supabase
            .from('waitlist')
            .insert({email: email, hashed_ip: hashedIP})
            .select()
            .single();

        if(inError) {
            if (PUBLIC_DEV) console.error(inError);
            if (inError.message === 'duplicate key value violates unique constraint "waitlist_email_key"') {
                return fail(400, {success: false, threat: "You already signed up for it!"});
            }
            return fail(400, {success: false, threat: 'Oh no! Something went wrong!'});
        }

        return {success: true, threat: 'Signed up successfully! Thx! Stay tuned.',};
    },
} satisfies Actions;

export const load = ({url}) => {
    return {
        meta: {
            title: "Contact",
            canonUrl: "https://www.chaos-abyss.com",
            metaNamed: [
                { name: "description", content: "Contact page for Chaos Abyss. Slide into my inbox - it’s lonely in there." },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: "Contact" },
                { name: "twitter:description", content: "Contact page for Chaos Abyss. Slide into my inbox - it’s lonely in there." },
                { name: "twitter:image", content: "https://www.chaos-abyss.com/img/ogimg.png" }
            ],
            metaProperty: [
                { property: "og:type", content: "website" },
                { property: "og:locale", content: "en_US" },
                { property: "og:title", content: "Contact" },
                { property: "og:description", content: "Contact page for Chaos Abyss. Slide into my inbox - it’s lonely in there." },
                { property: "og:url", content: url.href },
                { property: "og:image", content: "https://www.chaos-abyss.com/img/ogimg.png" }
            ],
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact",
                "url": "https://www.chaos-abyss.com",
                // look at him yapping about himself
                "mainEntity": {
                    "@type": "Person",
                    "name": "Maksiks",
                    "url": "https://maksiksync.vercel.app",
                    "gender": "Male",
                    "knowsLanguage": ["English", "Ukrainian", "Japanese"],
                    "alternateName": "maksiksq",
                    "description": "Maksiks is a self-taught software developer with a passion for Japanese, games, media, and design..",
                    "image": "https://www.chaos-abyss.com/img/pfpvlike40somethingidkilostcountsquaresmol.webp",
                    "sameAs": [
                        "https://github.com/maksiksq",
                        "https://bsky.app/profile/maksiks.bsky.social",
                        "https://x.com/maksiksq",
                        "https://maksiksync.vercel.app"
                    ],
                    "jobTitle": "Software Developer",
                    "knowsAbout": [
                        "Software Development",
                        "JavaScript",
                        "Youtube",
                        "Japanese",
                        "Games and Media",
                        "Design"
                    ],
                    "alumniOf": {
                        "@type": "CollegeOrUniversity",
                        "name": "Vinnytsia College of the National University of Food Technology"
                    },
                    "birthPlace": {
                        "@type": "Place",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Vinnytsia",
                            "addressCountry": "Ukraine"
                        }
                    }
                }
            }
        }
    };
};