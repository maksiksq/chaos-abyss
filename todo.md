- [x] : add time parser 
- [x] : style bits
- [x] : basic editor !!!
- [ ] : add all options to editor (not just content)
- [ ] : full editor
- [ ] : search
- [ ] : home page
- [ ] : add meta stuff like descs (a lib for this or Svelte has smth built in?)
- [ ] : apply for google news
- [x] : maybe add arbitrary code to arbitrary // done @html instead
- [ ] : make Arbitrary styles scoped
- [ ] : make header capitalization optional
- [ ] : word count
- [ ] : make header colors an option
- [ ] : figure out optimal seo tags
- [x] : maybe make half width quotes properly
- [ ] : make runnable code blocks myself, mabye???
- [ ] : setting to change accent color in editor
- [ ] : markdown-it codesandbox embed
- [ ] : remove unnecessary highlight.js styles
- [x] : clean up whatever the hell is happening in page.svelte right now
- [ ] : SERVER SIDE ONLY MARKDOWN RENDERING, SEND THE BAKED HTML ALREADY FROM THE STORAGE !!!!!
- [ ] : make footer a bit more hitting (sorta done)
- [x] : previous article/next article
- [ ] : style previous article/next article differently
- [x] : implement previous/next with the backend
- [ ] : comments
- [ ] : figure out if isp or no isp
- [ ] : experiment with just layout and page for articles
- [ ] : maybe autospace in md part of the editor to match article line height better?
- [ ] : maybe revisit hand slightly
- [ ] : remake anim in afterfx (nooo, pain) oorrrrrrrr incorporate all of this as part of the art and a 4th wall break surely this is going to be not pain to make right

workflow:
first of all to access the editor you need the supabase auth otherwise no way you getting in, then:
client| editor preview -> client| render, whatever
client| editor send -> server| render and sanitize, make route, send back -> client| renders @html**