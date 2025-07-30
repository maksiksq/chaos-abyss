export const load = () => {
    return {
        meta: {
            title: "Chaos Abyss",
            canonUrl: "https://chaos-abyss.com",
            noindex: false,
            metaNamed: [
                { name: "description", content: "Cool blog. Come in, we have pancakes. (he's lying, there are no pancakes)." },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: "Chaos Abyss" },
                { name: "twitter:description", content: "Cool blog. Come in, we have pancakes. (he's lying, there are no pancakes)." },
                { name: "twitter:image", content: "https://chaos-abyss.com/img/ogimg.png" }
            ],
            metaProperty: [
                { property: "og:type", content: "website" },
                { property: "og:locale", content: "en_US" },
                { property: "og:title", content: "Chaos Abyss" },
                { property: "og:description", content: "Cool blog. Come in, we have pancakes. (he's lying, there are no pancakes)." },
                { property: "og:url", content: `https://chaos-abyss.com` },
                { property: "og:image", content: "https://chaos-abyss.com/img/ogimg.png" }
            ],
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "inLanguage": "en",
                "name": "Chaos Abyss",
                "url": "https://chaos-abyss.com"
            }
        }
    };
};