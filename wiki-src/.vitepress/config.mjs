import { defineConfig } from 'vitepress'

export default defineConfig({
    // Served at nostalgic.am/wiki/
    base: '/wiki/',

    title: 'Nostalgic Trees',
    description: 'Packmaker reference for the Nostalgic Trees Minecraft mod',

    // Output into the repo's wiki/ folder so GitHub Pages serves it
    outDir: '../wiki',

    // Clean URLs (no .html suffix in links)
    cleanUrls: true,

    // Ignore links to anchors on the landing page etc.
    ignoreDeadLinks: true,

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
