I'm almost done with furnishing and publishing this place, and usually at this point normal people would say something engaging along the lines of "I am so excited to present to you - Chaos Abyss!", but no, I'm just tired, not from making this project but from existing. And that doesn't mean I'll stop. I'll keep making things. I'll keep filling in the abyss deep inside my soul. Owa, that took a wrong turn.

This is a blog/publication, I guess? Hard to call it a real publication, but at the same time it's probably higher quality than most actual publications. I guess I'd call it a curated blog. Might rewrite the about page with that in mind lol.

## What is Chaos Abyss?
Here is where I cast my whimsy into the world. Some stuff here is serious, and some stuff is not very serious. All you need is to look at the discovery page right [here](/articles).

## Just another blog?
I've been working on this project for the last month about 6-12 hours a day, although there were some real-life complications, so it's probably a bit less than that, but my Hackatime timer is ticking 200 hours on this project, which only includes coding time, writing and Figma usage which isn't the full extent of it too.
 
That said, it's totally just another blog, nothing taking that away.

And yes, I could just make a website with wordpress or any other cms and I had the unfortunate experience of doing that for money in the past (the money is nice tho, yoink). But that would just lose so much of the aforementioned whimsy, so much creativity, so much experience and flexibility; making it myself is fun, and that's exactly the thing I hated about those cms commissions I made in the past, it was not fun at all.

Plus I just learnt Svelte and SvelteKit a month or two ago, and never before I made so much back-end and a well-rounded blog is a nice entrypoint to that. The next blog will take me 15 days, and the one after that will take 7.5. If I ever need to make another personal blog that is, which is unlikely, but you get the point.

I took some inspiration from Medium and Tofugu, particularly how an article should even look like. Medium is just a cringe posting website, but it has some nice UI and I bloody love reading Tofugu articles, they're so well written and well-made.

One thing that I wish I could incorporate more in here is art. As you can see, the thumbnails for most articles are in a specific minimalist style, which looks cool and all, but I'd like to draw something, but then it's going to take me an eternity to post one so that's simply unrealistic in the current state of things. Maybe I'll work on that in the future tho.

## The Topics and Toppings
mmm tasty

It's mostly the stuff I'm interested in right now.
- Development of any kind.
- Japanese, since I'm learning Japanese.
- Games and Stuffs - all the hours I spent in Stardew Valley, or Hades, or Minecraft, or- yes a lot of stuff + anime or something.
- My projects, the list of which is ever-growing.
- Plus some stuff that didn't fit into any category, like [crickets](/articles/miscellaneous/crickets).

At the time of publication tho. This list will probably grow, it's not the full extent of my OCD's.

## So how was this made?

**Svelte**. A lot of Svelte.

I will be mostly skimming over stuff from a developer's perspective, do not expect much explanation here, but I'll highlight some hopefully interesting bits. If you're trying to make something like this yourself, sit down and listen. Or read. Probably better off reading.

### The insides

Picking a UI framework was easy. That is to say, I'm obsessed with Svelte.

Then for the database it's Supabase because I'm not making all that myself.

### Styling

Also, I've stopped using SASS lately in favor of vanilla CSS, modern CSS is more than enough for almost any app. My CSS is cursed tho, it's all:
```    

probably-nested-selector {
        & even-more-nested-selector {
            color: beans;
        }
    }
    
```



### Markdown

Before anything, I implemented the styles and the generated page for the articles themselves. My initial call was to make each thing manually and then make a custom syntax for it, but then I quickly remembered **Markdown** *exists*, I don't need to reinvent Markdown with my custom article parser so it's library choosing time.

After looking some stuff up, **Markdown-it** seemed like the best bet, because it wasn't much about being out of the box but rather about plugins, which is perfect if I want to retain search engine optimization with semantic tags (e.g. &lt;article&gt;) and style it a lot.
![The original page](https://ik.imagekit.io/maksiks/2025-07-01_17-01%20(2).png 'The original page')

I implemented basically anything I might need for writing an article.

![Catppuccin Highlight.js theme](https://ik.imagekit.io/maksiks/2025-07-01_19-29%20(1).png 'Catppuccin Highlight.js theme codeblock')

One thing that bothered me was the lack of a proper way to make captions for images, there existed libraries, but they were kind of jank. So I made a whole thing.
![Markdown-it image caption](https://ik.imagekit.io/maksiks/image.png ':::nocaption')

### Then I made The Crystal

**The Crystal™** (dramatic)

![The Crystal](https://ik.imagekit.io/maksiks/2025-07-03_15-24%20(1).png 'The Crystal™')

This is basically exactly the branding I had in mind when making this site. The idea is based on some really old art that I did for my first attempt at making a portfolio, which went wrong, a modern successor of that is [maksiksync.vercel.app](https://maksiksync.vercel.app), but the original "altar" I guess, looked like this:

![The Crystal but old](https://ik.imagekit.io/maksiks/2025-07-26_13-11.png 'The Crystal™ but old')

If you want to take a look at the original page from back then, it was basically this [mockup](https://github.com/maksiksq/old-portfolio/blob/Syzygy/gallery/page.svg).

As for the homepage icon for the top left of the header (including this very page) I had to simplify it later because it didn't really work there. And now it's just this meme coming to life.

![Firefox meme](https://ik.imagekit.io/maksiks/firefox.png ':::nocaption')

This whole stage of the development then involved making all the static pages. I figured that would be best before making the back-end because I'll have some idea of what the actual user experience would look like, and it was definitely a good call.

![Older homepage](https://ik.imagekit.io/maksiks/2025-07-10_12-27%20(2).png 'An older version of the current homepage.')

### SEO

Then I spent an absurd amount of time making it optimized for search engines like I'm Wall Street Journal or something. I have everything: proper meta tags, social media previews, JSON-LD, a sitemap. And it's all automatically generated - zero input from my side for articles.

![Lighthouse report](https://ik.imagekit.io/maksiks/2025-07-12_16-46%20(1).png 'ez')

### The back-end

Then it was back-end time, I had no idea how to use SvelteKit at the time so what did I do? I learnt how to use SvelteKit, now I have an idea.

The real blessing is Svelte's [docs](https://svelte.dev/docs/), they're just very good, even if a bit lacking in places. Plus their [tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte) which is also great and actually fun.

![routing docs](https://ik.imagekit.io/maksiks/2025-07-26_13-24.png ':::nocaption')

Can't forget the fuzzy search with Fuse.js.

![fuse js search](https://ik.imagekit.io/maksiks/2025-07-14_16-48%20(1).png ':::nocaption')

Then came an editor, a dashboard, the ability to edit articles and all the good stuff. It was a lot of bugs but having a written with future use in mind codebase helped a lot to alleviate the pain, which is nice.

![editor](https://ik.imagekit.io/maksiks/2025-07-16_21-52%20(1).png 'My private article editor. <br>Hidden and locked in plain sight. (Homepage, ↑↑↓↓←→←→)')

Mix all that into a soup, and you'll get a deep black infinite void of neverending chaos.

### The sauce is open.

> It's open-source. Go check the repo out!

Here's the [repository](https://github.com/maksiksq/chaos-abyss/). All the code is there for you to see!

You're free to use anything in there for your own things as long as you're not trying to blatantly copy it, steal the Chaos Abyss identity, or do something malicious with it.

Credit is appreciated but not mandatory.

## And Writing

Can't forget about writing the articles themselves. Well, that's what I'm doing now, and what you're reading right now. Fourth wall break. Shock.

![Drafts](https://ik.imagekit.io/maksiks/2025-07-26_19-46.png 'Here are some drafts for this article&apos;s thumbnail. | top')

That red one looks sick too. Was my second contender in line.

![Drafts for wider pics](https://ik.imagekit.io/maksiks/2025-07-26_19-46_1.png 'And these are for the wide (pc) thumbnail | top')

Writing the articles is probably the most important part, because no matter how cool and sophisticated a blog is, the whole point is the text written in there, the points made and the things shared after all.

### What I want to post
I want to post:
- Things I learnt, because I always learn. And consume.
- Tutorials.
- Occasional opinions on some stuff.
- Silly articles about silly topics I found silly or sharable.

### What I don't want to post
Here you won't see:
- Sensational articles <small class="desc">*"I SURVIVED THE NIGHT OF A THOUSAND CRICKETS AND YOU WON’T BELIEVE HOW"*</small>
- AI written shit
- 2000 words of fluff for a two-sentence point

What am I gonna, give you ads and a pop-up with a newsletter? I'd rather starve. But I don't like starving, here's my [Ko-fi](https://ko-fi.com/maksiks), no pressure tho.

## And that's about it.
Check back sometime if you're interested. Now, let's see how this abyss goes.