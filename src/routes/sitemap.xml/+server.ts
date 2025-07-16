import {getClient} from "$lib/utils/getSupabaseClient";
import crypto from 'crypto';
import type {RequestEvent} from "@sveltejs/kit";
import {timestamptzToISOtz} from "$lib/utils/timestamptzToISOtz";

const generateEtag = (input: string) =>
    `"${crypto.createHash('sha1').update(input).digest('hex')}"`;

const getEtagFromRequest = (e: Request): string | null =>
    e.headers.get('if-none-match');

const base = `https://chaos-abyss.com`;

const stableStringify = (obj: any): string => {
    return JSON.stringify(obj, Object.keys(obj).sort());
}

const calculateForDate = (date: string, jewel: boolean) => {
    // here we compare the date with whatever time value I picked
    // to get the correct (probably) priority
    const dateAsObj = new Date(date);
    const now = new Date();

    const msPerDay = 1000 * 60 * 60 * 24;
    const diffInMs = now.getTime() - dateAsObj.getTime();
    const ageInDays = Math.floor(diffInMs / msPerDay);

    const priority =
        jewel ? 0.9
            : ageInDays < 7 ? 0.8
                : ageInDays < 30 ? 0.6
                    : ageInDays < 180 ? 0.4
                        : ageInDays < 365 ? 0.3
                            : 0.2

    const changeFreq =
        ageInDays < 7 ? 'daily'
            : ageInDays < 30 ? 'weekly'
                : ageInDays < 365 ? 'monthly'
                    : 'yearly'

    return {priority, changeFreq}
}

const assignForDate = (date: string, jewel: boolean) => {
    // here we assemble all that
    const {priority, changeFreq} = calculateForDate(date, jewel);
    return `<changefreq>${changeFreq}</changefreq><priority>${priority}</priority>`;
}

export async function GET(e: RequestEvent) {
    const staticPages = [
        {url: 'https://chaos-abyss.com', changeFreq: 'monthly', priority: 1.0},
        {url: 'https://chaos-abyss.com/about', changeFreq: 'monthly', priority: 1.0},
        {url: 'https://chaos-abyss.com/articles', changeFreq: 'weekly', priority: 0.8},
        {url: 'https://chaos-abyss.com/contact', changeFreq: 'yearly', priority: 0.7},
    ]

    const supabase = getClient();
    const {data: articles, error: err} = await supabase
        .from('articles')
        .select('slug, category, date, last_edit, jewel')

    if (err || !articles) {
        return new Response('Had a skill issue getting articles', {status: 500});
    }

    const articleUrls = [
        ...articles.map(({slug, category, date, last_edit: lastEdit, jewel}: {
            slug: string,
            category: string,
            date: string,
            last_edit: string | null,
            jewel: boolean | null
        }) => ({
                url: `${base}/articles/${category}/${slug}`,
                category,
                date: `${lastEdit ? timestamptzToISOtz(lastEdit) : timestamptzToISOtz(date)}`,
                jewel
            }
        )),
    ]

    const rawEtagSource = stableStringify({staticPages, articles});
    const etag = generateEtag(rawEtagSource);

    const incomingEtag = getEtagFromRequest(e.request);
    if (incomingEtag === etag) {
        return new Response(null, {
            status: 304,
            headers: {'ETag': etag}
        });
    }

    return new Response(
        `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
		${staticPages.map(({url, changeFreq, priority}) =>
            `
            <url>
            <loc>${url}</loc>
            <changefreq>${changeFreq}</changefreq>    
            <priority>${priority}</priority>
            </url>
            `
        )}
		${articleUrls.map(({url, category, date, jewel}) => {
                return category !== 'draft' ? `<url>
					<loc>${url}</loc>
					${assignForDate(date, jewel)}
				    <lastmod>${date}</lastmod>
				</url>` : ''
            }
        )
            .join('')}
		</urlset>`.trim(),
        {
            headers: {
                'Content-Type': 'application/xml',
                'ETag': etag
            }
        }
    );
}