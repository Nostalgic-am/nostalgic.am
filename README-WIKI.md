# Nostalgic Wikis — Setup

VitePress sources for the mod wikis on nostalgic.am. Each mod has its own wiki:

| Wiki | Source | Live at |
|---|---|---|
| Nostalgic Trees | `wiki-src/nostalgictrees/` | https://nostalgic.am/wiki/nostalgictrees/ |
| Nostalgic Dialog | `wiki-src/nostalgicdialog/` | https://nostalgic.am/wiki/nostalgicdialog/ |

Pushing a change under `wiki-src/` runs the **Build Wiki** workflow. It builds every wiki into `wiki/<mod>/` and commits the result back to `main`, and GitHub Pages serves it.

## Folder layout

```
nostalgic.am/
├── CNAME
├── treeconfig/                      Tree Config Generator
├── blockpattern/
├── package.json                     build scripts
├── .github/workflows/build-wiki.yml
├── wiki/                            built output (written by the workflow, don't edit)
└── wiki-src/
    ├── nostalgictrees/
    │   ├── .vitepress/config.mjs    sidebar, nav, base path
    │   └── *.md, recipes/, trees/
    └── nostalgicdialog/
        ├── .vitepress/config.mjs
        ├── public/                  images (banner.gif)
        └── *.md, guide/, logic/, using/, examples/
```

## Before you push

The workflow commits the built wiki back to `main`, so your local copy falls behind after every build. Always pull first:

```bash
git pull
```

## Local preview

```bash
npm install
npm run dev:trees      # http://localhost:5173/wiki/nostalgictrees/
npm run dev:dialog     # http://localhost:5173/wiki/nostalgicdialog/
```

Edit any `.md` file and the page updates live.

To test the real build:

```bash
npm run build                                    # builds every wiki
npm run preview:dialog                           # or preview:trees
```

The build **fails on a broken link** between pages (`ignoreDeadLinks: 'localhostLinks'` in each config). Fix the link the error names and build again.

## Adding a page

1. Create the `.md` file in the mod's folder, for example `wiki-src/nostalgicdialog/guide/portraits.md`.
2. Add it to the `sidebar` in that mod's `.vitepress/config.mjs`:
   ```javascript
   { text: 'Portraits', link: '/guide/portraits' }
   ```
   Links leave out the `.md` and the `/wiki/<mod>/` part.
3. Commit and push.

## Adding a wiki for another mod

1. Copy `wiki-src/nostalgicdialog/.vitepress/` to `wiki-src/<newmod>/.vitepress/`.
2. In its `config.mjs`, change `base` to `/wiki/<newmod>/`, `outDir` to `../../wiki/<newmod>/`, the title, description, nav and sidebar.
3. Add an `index.md` and your pages.
4. In `package.json`, add `"build:<newmod>": "vitepress build wiki-src/<newmod>"` and add it to the `build` script.

## Look

Every wiki uses the standard VitePress theme, with light and dark mode, so they all look the same. Images go in the wiki's `public/` folder and are linked from the root, for example `<img src="/banner.gif">`.

## Troubleshooting

**The workflow ran but nothing was committed.**
Either nothing changed, or the workflow can't write. Check `Settings → Actions → General → Workflow permissions` and choose "Read and write permissions".

**Push rejected ("fetch first").**
The workflow committed a build since your last pull. Run `git pull`, then push again.

**A wiki shows a 404.**
Check `Settings → Pages`: the source should be the `main` branch, root folder. Force a redeploy with an empty commit: `git commit --allow-empty -m "Force pages rebuild" && git push`.

**The build fails with "Found dead links".**
A link points to a page that doesn't exist. The error names the page and the link. Fix the path, without the `.md` extension.

**I pushed and the workflow didn't run.**
It only runs for changes under `wiki-src/`, to `package.json`, or to the workflow file. Start it by hand from the Actions tab: `Build Wiki` → `Run workflow`.
