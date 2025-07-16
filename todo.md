- [x] : add article read time (~ very approx and idk humanely)
- [x] : add categories to url
- [x] : add meta stuff like descs (a lib for this or Svelte has smth built in?)
- [x] : add sitemap
- [x] : and make the header responsive while you're at it
- [x] : basic editor !!!
- [x] : cdn ; did external service but same thing
- [x] : check if search article is most relevant ? i didn't sort them but it's alr probably
- [x] : clean up whatever the hell is happening in page.svelte right now
- [x] : db
- [x] : do seo for all other pages
- [x] : experiment with just layout and page for articles
- [x] : figure out optimal seo tags
- [x] : hardcode the domain (again ....)
- [x] : home page
- [x] : implement previous/next with the backend
- [x] : make discord bots for Converge (just so i dont forget)
- [x] : images via couldflare images ; did another service instead forgor the name
- [x] : make footer a bit more hitting (sorta done)
- [x] : make footer responsive
- [x] : make minor edits to responsive once you have the domain ; used --host instead
- [x] : make search cards different
- [x] : make sure zoom is more or less responsive
- [x] : maybe add arbitrary code to arbitrary // done @html instead
- [x] : maybe make half width quotes properly
- [x] : maybe make seo default layout actually use route instead of just yoinking the meta? I'm not sure if it's ok anyway although it does seem like so
- [x] : move all logic to client where necessary
- [x] : previous article/next article
- [x] : responsive the hell of it
- [x] : restyle articles page a bit
- [x] : search
- [x] : seo images on article page
- [x] : separate head fig and banner fig
- [x] : SERVER SIDE ONLY MARKDOWN RENDERING, SEND THE BAKED HTML ALREADY FROM THE STORAGE !!!!!
- [x] : style bits
- [x] : use dates, not strings
- [x] : word count
- [x] : if i want to i can in theory do a get search query that doesn't reload the page with invalidate() I think ; Svelte doesn't do it anyway


- [ ] : admin: mark articles as yearly (should be cool on dashboard)
- [x] : editor: add all options to editor (not just content)
- [ ] : editor: add editor auth
- [ ] : editor: add more functions to editor
- [x] : editor: admin: make slug manual
- [x] : editor: fix editor for db and stuff
- [ ] : editor: full editor
- [ ] : editor: make header colors an option
- [ ] : editor: maybe autospace in md part of the editor to match article line height better?
- [ ] : editor: plug editor in
- [ ] : editor: setting to change accent color in editor
- [ ] : editor: setup drafts in the db
- [ ] : editor: handle drafts later
- [ ] : later: add admin mode (edit articles and etc.)
- [ ] : later: add more easter eggs yes please
- [ ] : later: add sources block
- [ ] : later: apply for google news
- [ ] : later: check for mistakes
- [ ] : later: color associations for more things (notably articles feats)
- [ ] : later: comments
- [ ] : later: fix searchbar caret
- [ ] : later: fix stuck in search page / probably just making it fixed with a wrapper maybe
- [ ] : later: fix svelte vs vue vs react formatting
- [ ] : later: figure out if isp or no isp
- [ ] : later: image based accent
- [ ] : later: kofi maybe??? (maybe plug)
- [ ] : later: markdown-it codesandbox embed
- [ ] : later: remove unnecessary highlight.js styles
- [ ] : later: RSS
- [ ] : later: Supabase keepalive !!!
- [ ] : later: write the articles !!!
- [ ] : maybe: dark mode (proper color matched gonna be hard)
- [ ] : maybe: make runnable code blocks myself, mabye???
- [ ] : maybe: style previous article/next article differently
- [ ] : prod: check if sitemap also updates weirdly in production
- [ ] : prod: redirect vercel domains to chaos-abyss.com
- [ ] : prod: submit sitemap to search console
- [ ] : very later: maybe later add search suggestions
- [ ] : very later: maybe more search filters in the future
- [ ] : very later: maybe revisit hand slightly
- [ ] : very later: remake hand anim later
- [ ] : soon: favicon

<br>~~- [ ] : make header capitalization optional~~ ; it matches the db now
<br>~~- [ ] : scrap: add burger for phone~~
<br>~~- [x] : scrap: change head fig bg to something other than accent color~~
<br>~~- [x] : scrap: maybe make head fig shadow more intense (or keep it)~~
<br>~~- [x] : scrap: add time parser~~

i should really use like Trello for this

workflow:
first of all to access the editor you need the supabase auth otherwise no way you getting in, then:
client| editor preview -> client| render, whatever
client| editor send -> server| render and sanitize, make route, send back -> client| renders @html**