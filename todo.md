- [x] : add time parser 
- [x] : style bits
- [x] : basic editor !!!
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
- [x] : implement preivous/next with the backend
- [ ] : comments
- [ ] : figure out if isp or no isp

workflow:
first of all to access the editor you need the supabase auth otherwise no way you getting in, then:
client| editor preview -> client| render, whatever
client| editor send -> server| render and sanitize, make route, send back -> client| renders @html**