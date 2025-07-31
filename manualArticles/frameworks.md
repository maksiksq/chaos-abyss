It's 2025 outside, you probably want to make a website of one kind or another and the modern way to do that is a JavaScript framework, but which?

Whether you're just learning or thinking what to pick for your next project, I have spent lots of hours with each one of them in the title, so I'll share my experience as a developer and some data.

One thing I want to make clear before we start, there is no best JS UI framework, but there is the best framework for you and your specific use case. Each one has its own pros and cons, keep that in mind.

## Popularity comparison and why it's sorta a lie
To give you a little bit of context, here are some popularity rankings according to [State of JS](https://2024.stateofjs.com/en-US/libraries/front-end-frameworks). These can give you a lot of insight, but don't jump to conclusions. More popular does not equal better, in fact, depending on the situation, it might be quite the opposite. Why? I'll go into detail for each framework later.
![State of JS 2024](https://assets.devographics.com/captures/js2024/en-US/front_end_frameworks_ratios.png 'State of JS 2024')

So let's get into it, one by one.
## React - the old standard
![React logo and caption](https://ik.imagekit.io/maksiks/react%20img%20maybe%20(9).png ':::nocaption')

[React](https://react.dev/) is by far the most popular UI framework out there, and it was a groundbreaking framework in 2013, and that momentum keeps it going to this day.

So how does it compare to modern frameworks? Not very. It uhh, pretty bad. Don't get me wrong, it's not unusable, but it's definitely not the most fun and stable.

And also a lot of people's problem with React is corporate backing - made and maintained by Facebook, influenced by Vercel as a sponsor, and a ton of companies who just got used to it. It's not just 'oh noie this big bad evil company owns this thing I use', it seems to impact the direction the library itself is going.

But it's not all gloom and doom, React is still viable and often just necessary, it's not 'dead'.

### Pros and Cons:
#### Pros
- **Huge Ecosystem:** This is the main selling point of React when there are other frameworks in the conversation. Want a library to not make it yourself? Tcshhh, take it. Want a tutorial? As simple as that.
- **All Hail The Corporate:** If you want to get a job, you probably should learn the most staple and popular thing that's overused by companies that do not like change much.
- **JSX Syntax:** Some people just prefer it, gotta try and find out.
#### Cons
- **Less Modern:** As time went on, developers realized they needed new ways to make apps, and they made new things, React, mostly stayed.
- **Library Horror:** When making a React app sometimes it's like a *"choose your own adventure"*. You install lots of libraries for everything and each library has its own quirk and bug or two, and it all stacks up into a horrid mess.
- **It's Slow:** React is the hungriest of the 3, and where you're the likeliest to come to a performance bottleneck which also directly impacts search engine optimization (SEO). Add a pile of libraries on top of that too.
- **Learning curve:** The syntax is not fun and not easy. Fun isn't deterministic but you probably should keep it in mind.

### So should you use/learn it?
#### Well, that's up to you, but here's what it's good for:
- You want a job? ✅
- You want a huge ecosystem of cool libraries to play around with? ✅
- You want something tutorialized to hell so you don't ever get stuck? ✅
- You're making something big. ✅
#### And what it's bad for:
- You're making a personal project ❌
- You want something modern ❌
- You want something fast ❌
- You want something simple ❌

## Vue
![Vue logo and caption](https://ik.imagekit.io/maksiks/vue%20img%20confidently%20(1).png ':::nocaption')

[Vue](https://vuejs.org/) was released in 2014 by Vue's chill front-end dad/sorta tech bro Evan You. They also name their versions after anime/manga which I love, that's so fun.

As you'd expect from that last sentence, the community is much less corporate, although it is used by the corporate overlords as well.

![State of JS's Used At Work ranking](https://ik.imagekit.io/maksiks/img_2.png 'State of JS&apos;s "Used At Work" ranking')

Unlike React, Vue isn't bloated; unlike Svelte, Vue isn't minimalistic. It's somewhere in the middle of the two. Personally I love Vue's syntax, it's really easy to use and intuitive.

Vue uses Template Syntax instead of JSX, in simpler terms, you write HTML and put stuff into it, instead of whatever unholy soup you're adding together in JSX.

### Pros and Cons:
#### Pros:
- **Decently Sized Ecosystem:** It's not as big as React's but you can still find a reasonable library for a thing you need, usually.
- **Simple Syntax:** It's fun, it's approachable.
- **Nice Learning Curve:** Has a great tutorial, debatably the simplest of the 3.
- **Faster Than React:** Still uses a virtual DOM so it's not blazing fast, but it's better.
#### Cons:
- **Fragmented Ecosystem:** Probably a temporary issue. There exists Composition and Options api, and Vue 3 and Vue 2, a lot of libraries or users never moved and it's kinda weird.

There really isn't that much to hate here, but it still has some of the issues React does, just to a much more manageable degree. It's a very solid Framework, and if you prefer it, give it a shot.

### So should you partake in it?
#### Here's what it's good for:
- You're just starting out? ✅
- You want something approachable but with advanced stuff once you get going? ✅
- You're making a personal project ✅
- You want an ecosystem of cool libraries to aid you? ✅
- You want something tutorialized pretty well? ✅
#### And what it's bad for:
- You don't really like the syntax ❌
- You want something that's very very fast ❌
- You want less built-in and more DIY or libraries ❌
- Some of the very same issues as with React ❌

## Svelte
![Svelte logo and caption](https://ik.imagekit.io/maksiks/svelte%20img%20confidently%20(1).png ':::nocaption')

I am very biased towards [Svelte](https://svelte.dev/), because I like it. And there's a lot to like. Also the tutorial includes a rickr- nvm I won't spoil it, unless I already did.

Svelte was created in 2016 by Rich Harris, well, technically Ractive.js in 2013 even before that. It's a framework that's meant to make things easy and efficient - attractively thin, graceful and stylish *(that's what the word svelte means)*.

The syntax - I love it, minimalistic, just as all the things should be. It's fun and easy to write efficiently. To complement that there are well written docs which explain everything in detail and another great tutorial.

It's the thing people are most excited about and I totally see why. It really feels optimized for your sanity. But you can't take my word for it until you try it.

### Pros and Cons:
#### Pros:
- **Fast:** I am speed. No virtual dom, very small, very fast, all the good stuff.
- **Modern:** That's where the things are going, eventually.
- **You Don't Need Them Libraries More or Less:** Svelte makes it easy to implement it yourself. Does it save you time, maybe? Not on something complex, probably. But does it save you a headache? Yes.
- **Easy:** It might be (debatably) more difficult than Vue, but it's not difficult.
#### Cons:
- **Small Ecosystem:** People tend to put it as *small but growing*, and it is, but it's just not there yet.
- **New and breaking:** Most things you find on Google about Svelte around are going to be about older versions before they added runes. And that's because it's new and fresh and changing fast, even if immensely powerful already.

My main complaint is SEO, that's kinda pain in Svelte. But any issues right now are subject to change, aren't they?

### So should you use/learn Svelte?
#### Why yes?
- You're making a personal project ✅
- You want something fast as hell ✅
- You're just starting out ✅
- You want something modern and progressive ✅
- You like the syntax ✅
- You want to flex (it's the coolest framework) ✅
#### And what it's bad for:
- You want a job? ❌
- You want a lot of libraries? ❌
- You want tutorials? ❌
- You don't like change ❌

## So which?
Well it depends, of course. If you're learning, I'd go for either Vue or Svelte. I started with React and it was not fun. Svelte is the way for new things, but there are considerations to not use it because it's only growing.

And if you're looking for a UI framework, you should also consider a meta-framework. Usually for React it's Next.js, for Vue it's Nuxt.js, for Svelte it's SvelteKit. Those are essential in many cases.

And the frameworks don't end on these three, there is [Angular](https://angular.dev/), [Qwik](https://qwik.dev/), [Solid.js](https://www.solidjs.com/) and others.

Plus, it doesn't stop in JS, there are Rust web UI frameworks like [Leptos](https://leptos.dev/), [Dioxus](https://dioxuslabs.com/) and [Yew](https://yew.rs/). It's a big wide world.

## Sources
- [State of JS 2024](https://2024.stateofjs.com/en-US/libraries/front-end-frameworks)
- [This random repo with performance benchmarks](https://github.com/Pierstoval/benchmarks-react-svelte-vue?tab=readme-ov-file)<br>