There are a lot of principles in programming that came about to guide us into making better code, and one of the most frequently mentioned principles is **DRY** - Don't Repeat Yourself.

Now, whether you should use some of these principles at all is a whole other dilemma, but you probably should consider it for a lot of them. There's a reason they're there, after all.

## The problem with DRY

In an ideal world: "...a modification of any single element of a system does not require a change in other logically unrelated elements." but in reality, when you get to writing code, often times abstraction of everything to have a single entry point is a waste of time.

It always feels nice to have a hyper-optimized codebase, where everything is made with absolute future reuse in mind, and then you open up your class where everything you made is a separate method, it's 2000 lines of code, we're doomed, you're hastily trying to find the thing you need. It's over. *No it's not, I'll just make it all into separate classes and reuse them!* And now your codebase has 100 files. You can't navigate them at all, the prefixes, they haunt you.

This is an overly dramatic example, what I'm trying to show is that at some point it's just too much, you don't need to never repeat yourself at all.

In my opinion, it's fine to repeat your thing a few times if it's something that belongs to a place and would belong to another place after you copy it, your abstraction might just make things unnecessarily complicated, and then you can't turn back because you already put in effort, and it's a commitment, and it's a mess.

## AHA-haha
A better, also widely recognized principle is AHA, which means Avoid Hasty Abstractions. And sounds funny, aha-ha-ha! muhaha-ha-ha- nevermind.

And now you're in this situation. *But I can't turn back, I can't put it back, I made all this, I spent hours abstracting it all... NOOO!*

This is the **[sunk cost fallacy](https://en.wikipedia.org/wiki/Sunk_cost)**: imagine you bought an ice cream, but you don't want an ice cream anymore. You ate a third of it, and you might still want to eat the ice cream "because I paid money for it, I can't let it go to waste". And the same applies here.


The point that AHA makes is something along the lines of: "Don't abstract until it repeats and is real". Abstract only when it's clearly useful, and sometimes it might take a few duplications to reach that point. And abstracting it was premature? - Then delete it.

This principle exists to make development more flexible, repeat it as many times as you need, but don't let it get out of hand. And to combat the sunk cost fallacy, don't let early effort lock you into a bad design.

## My take

We can philosophize a lot about it, but holding these principles to heart isn't the best idea either. Sometimes you might want to keep it just for clarity even if it's inefficient, sometimes the deadline is tomorrow, and it's so hectic, time for copy-paste. AHA is better than DRY but, as all things should be, it's good in moderation.

I'm not saying you should regularly repeat your code, your codebase will end up like a dumpster fire when you look at it again in a month and then when you have to make a change somewhere, it's searching time again 🫠. But I'm saying you should think about it every time.

Just something to think about. But your mileage may vary.