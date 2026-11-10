import { defineConfig } from 'vitepress'

export default defineConfig({
    // Served at nostalgic.am/wiki/nostalgicdialog/
    base: '/wiki/nostalgicdialog/',

    title: 'Nostalgic Dialog',
    description: 'Guide and reference for the Nostalgic Dialog Minecraft mod',

    // Output into the repo's wiki/ folder so GitHub Pages serves it
    // (relative to this folder: wiki-src/nostalgicdialog/)
    outDir: '../../wiki/nostalgicdialog/',

    cleanUrls: true,

    // Fail the build on a broken link inside the wiki, so readers never hit a 404.
    ignoreDeadLinks: 'localhostLinks',

    themeConfig: {
        nav: [
            { text: 'Get started', link: '/for-packmakers' },
            { text: 'Commands', link: '/using/commands' },
            { text: 'Examples', link: '/examples/elder' },
            // Add these once the pages exist:
            // { text: 'CurseForge', link: 'https://www.curseforge.com/minecraft/mc-mods/<slug>' },
            // { text: 'GitHub', link: 'https://github.com/Nostalgic-am/<repo>' },
        ],

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
                text: 'Building Dialogs',
                items: [
                    { text: 'Speakers & Portraits', link: '/guide/speakers' },
                    { text: 'Dialogs & Nodes', link: '/guide/dialogs' },
                    { text: 'Choices', link: '/guide/choices' },
                    { text: 'Text Tags', link: '/guide/text-tags' },
                ]
            },
            {
                text: 'Logic',
                items: [
                    { text: 'Conditions', link: '/logic/conditions' },
                    { text: 'Actions', link: '/logic/actions' },
                    { text: 'Flags & Relationships', link: '/logic/flags-relationships' },
                ]
            },
            {
                text: 'Using It',
                items: [
                    { text: 'Starting Dialogs', link: '/using/starting' },
                    { text: 'Commands', link: '/using/commands' },
                    { text: 'Customizing', link: '/using/customizing' },
                ]
            },
            {
                text: 'Examples',
                items: [
                    { text: 'Elder Rowan (trust & memories)', link: '/examples/elder' },
                    { text: 'Shopkeeper', link: '/examples/shopkeeper' },
                    { text: 'Quest Giver', link: '/examples/quest-giver' },
                ]
            },
            {
                text: 'Help',
                items: [
                    { text: 'Troubleshooting', link: '/troubleshooting' },
                ]
            }
        ],

        outline: { level: [2, 3] },

        footer: {
            message: 'All Rights Reserved.',
            copyright: 'Copyright © 2026 Nostalgic Dialog',
        },

        search: {
            provider: 'local'
        }
    }
})
