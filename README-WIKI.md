# Nostalgic Trees Wiki — Setup

VitePress source for the wiki at `nostalgic.am/wiki/`. Content lives in `wiki-src/`, builds to `wiki/`, served by GitHub Pages alongside your existing site.

## One-time setup

1. **Copy these files into your `nostalgic.am` repo root.** The folder should end up looking like:

   ```
   nostalgic.am/
   ├── index.html              (existing)
   ├── treeconfig/             (existing)
   ├── blockpattern/           (existing)
   ├── CNAME                   (existing)
   ├── package.json            (new — from this zip)
   ├── .gitignore              (new — merge with existing if you have one)
   ├── .github/workflows/build-wiki.yml  (new)
   └── wiki-src/               (new — all markdown source)
       ├── .vitepress/
       ├── index.md
       ├── recipes/
       ├── reference/
       └── trees/
   ```

2. **Push to main.** The workflow runs, builds `wiki-src/` → `wiki/`, and commits the built HTML back to the repo. GitHub Pages serves it at `nostalgic.am/wiki/`.

3. **That's it.** Every push to `wiki-src/**` triggers a rebuild automatically.

## Local development

To preview changes before pushing:

```bash
npm install
npm run dev
```

VitePress serves at `http://localhost:5173/wiki/` with hot reload. Edit any `.md` file and the page updates live.

To test the production build locally:

```bash
npm run build
npm run preview
```

## Adding a new page

1. Create a new `.md` file under `wiki-src/` (in the appropriate folder — `recipes/`, `reference/`, etc.)
2. Add an entry to the sidebar in `wiki-src/.vitepress/config.mjs`
3. Commit and push

Example — adding an events page:

```javascript
// in wiki-src/.vitepress/config.mjs, in the sidebar array:
{
    text: 'Events',
    items: [
        { text: 'Block Break Listeners', link: '/events/block-break' },
    ]
}
```

Then create `wiki-src/events/block-break.md` with your content.

## Editing existing content

Just edit the `.md` files. Push. The workflow rebuilds.

## Theming

The theme matches `nostalgic.am`: dark navy surfaces, Silkscreen pixel headings, red/green accents.

To tweak colors, edit `wiki-src/.vitepress/theme/custom.css`. The CSS variables at the top (`--nt-bg`, `--nt-accent`, etc.) are the main tuning knobs.

## Troubleshooting

**"The workflow ran but nothing was committed."**
Either no changes were detected or you don't have workflow write permissions. Check `Settings → Actions → General → Workflow permissions` and make sure "Read and write permissions" is enabled.

**"Built wiki shows a 404 at nostalgic.am/wiki/."**
GitHub Pages might still be serving from a cached build. Check `Settings → Pages` and confirm the source is `main` branch, root folder. Force a re-deploy by pushing an empty commit: `git commit --allow-empty -m "Force pages rebuild" && git push`.

**"Sidebar nav shows a broken link."**
The link in `config.mjs` points to a file that doesn't exist. Check that the target `.md` file is present under `wiki-src/` and the link path matches (without the `.md` extension).

**"I pushed and the workflow didn't run."**
The workflow is scoped to `wiki-src/**` paths by default. If you only changed `package.json` or the workflow file, trigger it manually from the Actions tab (`Build Wiki` → `Run workflow`).
