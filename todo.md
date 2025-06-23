- [x] : add time parser 
- [ ] : style bits
- [ ] : search
- [ ] : home page
- [ ] : add meta stuff like descs (a lib for this or Svelte has smth built in?)
- [ ] : apply for google news
- [ ] : maybe add arbitrary code to arbitrary
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
- [ ] : clean up whatever the hell is happening in page.svelte right now
- [ ] : SERVER SIDE ONLY MARKDOWN RENDERING, SEND THE BAKED HTML ALREADY FROM THE STORAGE !!!!!

workflow:
first of all to access the editor you need the supabase auth otherwise no way you getting in, then:
client| editor preview -> client| render, whatever
client| editor send -> server| render and sanitize, make route, send back -> client| renders @html