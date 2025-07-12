
export const load = ({url}) => {
    return {
        meta: {
            title: "About",
            canonUrl: "https://chaos-abyss.com/about",
            metaNamed: [
                { name: "description", content: "About page for Chaos Abyss. This is the part where I pretend to be professional." },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: "About" },
                { name: "twitter:description", content: "About page for Chaos Abyss. This is the part where I pretend to be professional." },
                { name: "twitter:image", content: `https://chaos-abyss.com/img/ogimg.png` }
            ],
            metaProperty: [
                { property: "og:type", content: "website" },
                { property: "og:locale", content: "en_US" },
                { property: "og:title", content: "About" },
                { property: "og:description", content: "About page for Chaos Abyss. This is the part where I pretend to be professional." },
                { property: "og:url", content: "https://chaos-abyss.com/about" },
                { property: "og:image", content: `https://chaos-abyss.com/img/ogimg.png` }
            ],
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "name": "About",
                "url": "https://chaos-abyss.com/about",
                // look at him yapping about himself
                "mainEntity": {
                    "@type": "Person",
                    "name": "Maksiks",
                    "url": "https://maksiksync.vercel.app",
                    "gender": "Male",
                    "knowsLanguage": ["English", "Ukrainian", "Japanese"],
                    "alternateName": "maksiksq",
                    "description": "Maksiks is a self-taught software developer with a passion for Japanese, games, media, and design. Over 200 hours of raw development time logged in one summer alone.",
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