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
            { text: 'Home', link: 'https://nostalgic.am/' },
            { text: 'Tree Config', link: 'https://nostalgic.am/treeconfig/' },
            { text: 'CurseForge', link: 'https://www.curseforge.com/minecraft/mc-mods/nostalgictrees' },
            { text: 'GitHub', link: 'https://github.com/Nostalgic-am/nostalgictrees' },
        ],

        // Left sidebar
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Overview', link: '/' },
                    { text: 'For Players', link: '/for-players' },
                    { text: 'For Packmakers', link: '/for-packmakers' },
                ]
            },
            {
                text: 'Trees',
                items: [
                    { text: 'Tree Config Schema', link: '/trees/config' },
                    { text: 'Default Trees', link: '/trees/defaults' },
                    { text: 'Custom Trees', link: '/trees/custom' },
                ]
            },
            {
                text: 'KubeJS Recipes',
                items: [
                    { text: 'Getting Started', link: '/recipes/getting-started' },
                    { text: 'Resource Crafts', link: '/recipes/resource' },
                    { text: 'Chunk Crafts', link: '/recipes/chunk' },
                    { text: 'Mutations', link: '/recipes/mutation' },
                    { text: 'Drying', link: '/recipes/drying' },
                    { text: 'Sapling Crafts', link: '/recipes/sapling' },
                    { text: 'Mallets', link: '/recipes/mallet' },
                ]
            },
            {
                text: 'Reference',
                items: [
                    { text: 'Recipe IDs', link: '/reference/recipe-ids' },
                    { text: 'Tags', link: '/reference/tags' },
                    { text: 'Targeting Recipes', link: '/reference/targeting' },
                    { text: 'Known Limitations', link: '/reference/limitations' },
                ]
            },
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
        },

        // Show "Edit this page" link at the bottom of each page
        editLink: {
            pattern: 'https://github.com/Nostalgic-am/nostalgic.am/edit/main/wiki-src/:path',
            text: 'Edit this page on GitHub'
        },
    }
})
