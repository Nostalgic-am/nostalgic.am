import { defineConfig } from 'vitepress'

export default defineConfig({
    // Served at nostalgic.am/wiki/nostalgictrees/
    base: '/wiki/nostalgictrees/',

    title: 'Nostalgic Trees',
    description: 'Packmaker reference for the Nostalgic Trees Minecraft mod',

    // Output into the repo's wiki/ folder so GitHub Pages serves it
    // (relative to this folder: wiki-src/nostalgictrees/)
    outDir: '../../wiki/nostalgictrees/',

    // Clean URLs (no .html suffix in links)
    cleanUrls: true,

    // Fail the build on a broken link inside the wiki, so readers never hit a 404.
    // Links to localhost (dev previews) are still allowed.
    ignoreDeadLinks: 'localhostLinks',

    themeConfig: {
        // Top nav bar
        nav: [
            { text: 'Tree Config', link: 'https://nostalgic.am/treeconfig/' },
            { text: 'CurseForge', link: 'https://www.curseforge.com/minecraft/mc-mods/nostalgic-trees' },
            { text: 'GitHub', link: 'https://github.com/Nostalgic-am/nostalgictrees' },
        ],

        // Left sidebar
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Overview', link: '/' },
                    { text: 'Players', link: '/for-players' },
                    { text: 'Packmakers', link: '/for-packmakers' },
                ]
            },
            {
                text: 'Trees',
                items: [
                    { text: 'Tree Config Schema', link: '/trees/config' }
                ]
            },
            {
                text: 'KubeJS Recipes',
                items: [
                    { text: 'Mutations', link: '/recipes/mutation' },
                    { text: 'Drying', link: '/recipes/drying' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Nostalgic-am/nostalgictrees' },
        ],

        footer: {
            message: 'All Rights Reserved.',
            copyright: 'Copyright © 2026 Nostalgic Trees',
        },

        search: {
            provider: 'local'
        }
    }
})
