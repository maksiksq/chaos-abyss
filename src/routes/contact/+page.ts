import type {PageLoad} from "../../../.svelte-kit/types/src/routes/contact/$types";

export const load: PageLoad = ({url}) => {
    return {
        meta: {
            title: "Contact",
            canonUrl: url.href,
            metaNamed: [
                { name: "description", content: "Contact page for Chaos Abyss. Slide into my inbox - it’s lonely in there." },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: "Contact" },
                { name: "twitter:description", content: "Contact page for Chaos Abyss. Slide into my inbox - it’s lonely in there." },
                { name: "twitter:image", content: `${url.origin}/img/ogimg.png` }
            ],
            metaProperty: [
                { property: "og:type", content: "website" },
                { property: "og:locale", content: "en_US" },
                { property: "og:title", content: "Contact" },
                { property: "og:description", content: "Contact page for Chaos Abyss. Slide into my inbox - it’s lonely in there." },
                { property: "og:url", content: url.href },
                { property: "og:image", content: `${url.origin}/img/ogimg.png` }
            ],
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact",
                "url": url.href,
                "mainEntity": {
                    "@type": "Person",
                    "name": "Maksiks",
                    "email": "mailto:maksiks.touch@gmail.com",
                    "image": `${url.origin}/img/pfp40likesmth.png`,
                    "sameAs": [
                        "https://github.com/maksiksq",
                        "https://bsky.app/profile/maksiks.bsky.social",
                        "https://x.com/maksiksq",
                        "https://discord.com/users/@maksiks"
                    ]
                }
            }
        }
    };
};