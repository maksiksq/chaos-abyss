<br>~~- [x] : scrap: add time parser~~
- [x] : style bits
- [x] : basic editor !!!
- [ ] : editor: add all options to editor (not just content)
- [ ] : editor: full editor
- [x] : search
- [x] : home page
- [x] : add meta stuff like descs (a lib for this or Svelte has smth built in?)
- [ ] : later: apply for google news
- [x] : maybe add arbitrary code to arbitrary // done @html instead
<br>~~- [ ] : make header capitalization optional~~ ; it matches the db now
- [x] : word count
- [ ] : editor: make header colors an option
- [x] : figure out optimal seo tags
- [x] : maybe make half width quotes properly
- [ ] : maybe: make runnable code blocks myself, mabye???
- [ ] : editor: setting to change accent color in editor
- [ ] : later: markdown-it codesandbox embed
- [ ] : later: remove unnecessary highlight.js styles
- [x] : clean up whatever the hell is happening in page.svelte right now
- [x] : SERVER SIDE ONLY MARKDOWN RENDERING, SEND THE BAKED HTML ALREADY FROM THE STORAGE !!!!!
- [x] : make footer a bit more hitting (sorta done)
- [x] : previous article/next article
- [ ] : maybe: style previous article/next article differently
- [x] : implement previous/next with the backend
- [ ] : later: comments
- [ ] : later: figure out if isp or no isp
- [x] : experiment with just layout and page for articles
- [ ] : editor: maybe autospace in md part of the editor to match article line height better?
- [ ] : very later: maybe revisit hand slightly
- [ ] : very later: remake hand anim later
- [ ] : later: RSS
- [ ] : later: add admin mode (edit articles and etc.)
- [x] : add article read time (~ very approx and idk humanely)
- [ ] : later: fix stuck in search page / probably just making it fixed with a wrapper maybe
- [x] : make search cards different
- [ ] : later: image based accent
- [x] : db
- [x] : use dates, not strings
- [ ] : editor: setup drafts in the db
- [x] : responsive the hell of it
- [ ] : maybe: dark mode (proper color matched gonna be hard)
- [x] : cdn ; did external service but same thing
- [ ] : later: add sources block
- [ ] : very later: maybe later add search suggestions
- [x] : restyle articles page a bit
- [ ] : very later: maybe more search filters in the future
- [x] : check if search article is most relevant ? i didn't sort them but it's alr probably
- [x] : move all logic to client where necessary
- [x] : if i want to i can in theory do a get search query that doesn't reload the page with invalidate() I think ; Svelte doesn't do it anyway
- [ ] : editor: fix editor for db and stuff
- [ ] : later: hopefully won't need it but Supabase keepalive !!!
- [x] : make discord bots for Converge (just so i dont forget)
  [x] : scrap: images via couldflare images ; did another service instead forgor the name
- [x] : seo images on article page
- [x] : maybe make seo default layout actually use route instead of just yoinking the meta? I'm not sure if it's ok anyway although it does seem like so
- [ ] : later: fix searchbar caret
- [ ] : later: color associations for more things (notably articles feats)
- [x] : add sitemap
- [x] : do seo for all other pages
- [ ] : editor: add more functions to editor
- [ ] : editor: plug editor in
- [ ] : editor: add editor auth
- [ ] : later: add more easter eggs yes please
- [ ] : later: write the articles !!!
- [ ] : prod: redirect vercel domains to chaos-abyss.com
- [x] : hardcode the domain (again ....)
- [ ] : prod: submit sitemap to search console
- [ ] : later: check for mistakes
- [ ] : editor: handle drafts later
  <br>~~- [ ] : scrap: add burger for phone~~
- [x] : and make the header responsive while you're at it
- [x] : make footer responsive
- [x] : make minor edits to responsive once you have the domain ; used --host instead
- [x] : add categories to url
- [ ] : editor: admin: make slug manual
- [x] : make sure zoom is more or less responsive
- [ ] : later: kofi maybe??? (maybe plug) 
- [ ] : admin: mark articles as yearly (should be cool on dashboard)
- [ ] : later: fix svelte vs vue vs react formatting
- [x] : separate head fig and banner fig
  <br>~~- [x] : scrap: change head fig bg to something other than accent color~~
  <br>~~- [x] : scrap: maybe make head fig shadow more intense (or keep it)~~
- [ ] : prod: check if sitemap also updates weirdly in production
- [x] : maybe remove read time. It hurts well-researched stuff



i should really use like Trello for this

workflow:
first of all to access the editor you need the supabase auth otherwise no way you getting in, then:
client| editor preview -> client| render, whatever
client| editor send -> server| render and sanitize, make route, send back -> client| renders @html**