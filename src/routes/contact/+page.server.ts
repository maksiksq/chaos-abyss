export const load = ({url}) => {
    return {
        meta: {
            title: "Contact",
            canonUrl: "https://chaos-abyss.com",
            metaNamed: [
                { name: "description", content: "Contact page for Chaos Abyss. Slide into my inbox - it’s lonely in there." },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: "Contact" },
                { name: "twitter:description", content: "Contact page for Chaos Abyss. Slide into my inbox - it’s lonely in there." },
                { name: "twitter:image", content: "https://chaos-abyss.com/img/ogimg.png" }
            ],
            metaProperty: [
                { property: "og:type", content: "website" },
                { property: "og:locale", content: "en_US" },
                { property: "og:title", content: "Contact" },
                { property: "og:description", content: "Contact page for Chaos Abyss. Slide into my inbox - it’s lonely in there." },
                { property: "og:url", content: url.href },
                { property: "og:image", content: "https://chaos-abyss.com/img/ogimg.png" }
            ],
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact",
                "url": "https://chaos-abyss.com",
                // look at him yapping about himself
                "mainEntity": {
                    "@type": "Person",
                    "name": "Maksiks",
                    "url": "https://maksiksync.vercel.app",
                    "gender": "Male",
                    "knowsLanguage": ["English", "Ukrainian", "Japanese"],
                    "alternateName": "maksiksq",
                    "description": "Maksiks is a self-taught software developer with a passion for Japanese, games, media, and design..",
                    "image": "https://yourdomain.com/img/pfp40likesmth.png",
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