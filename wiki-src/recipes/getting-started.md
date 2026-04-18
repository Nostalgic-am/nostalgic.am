# Getting Started with KubeJS

Nostalgic Trees integrates cleanly with [KubeJS](https://www.curseforge.com/minecraft/mc-mods/kubejs). This page covers the basics: where scripts go, how to load them, and the minimal pattern that every recipe script follows.

## Prerequisites

Install [KubeJS for NeoForge 1.21.1](https://www.curseforge.com/minecraft/mc-mods/kubejs) (version 2101.7.2 or later). Launch once — it creates a `kubejs/` folder in your instance.

## Folder structure

All recipe modification goes in `kubejs/server_scripts/`. Files must end in `.js`. To disable a script without deleting it, rename it to `.js.off` (or any extension other than `.js`).

```
kubejs/
├── server_scripts/      ← all recipe scripts go here
├── client_scripts/      ← JEI hiding etc. (not covered in most of this wiki)
├── startup_scripts/     ← custom creative tabs etc. (advanced)
└── exported/            ← registry dumps (useful for debugging)
```

## The minimal pattern

Every recipe script looks like this:

```javascript
ServerEvents.recipes(event => {
    // your code here
})
```

`ServerEvents.recipes` fires once during world load. Inside the callback, `event` is the handle you use to add, remove, and modify recipes. Everything else is layered on top of this pattern.

## Reloading scripts

After editing a server script, you have two options:

- **In-game:** `/reload` — re-runs server scripts against the current world. Fast.
- **Restart the world.** Reliable fallback if `/reload` misses anything.

Startup scripts (items, tabs, etc.) require a full game restart — they run once at launch.

## Your first script

Save this as `kubejs/server_scripts/test.js`:

```javascript
ServerEvents.recipes(event => {
    event.shaped(
        'minecraft:diamond',
        [
            ' D ',
            'DDD',
            ' D '
        ],
        {
            D: 'minecraft:dirt'
        }
    ).id('kubejs:test_diamond_from_dirt')
})
```

`/reload` in-game, open JEI, search for "diamond" — you should see a new recipe that makes a diamond from 5 dirt. Delete the script or rename to `.js.off`, `/reload` again, recipe is gone.

If the recipe doesn't appear, check `kubejs/logs/startup.log` for errors. Syntax mistakes fail silently in-game and only show up in that log.

## What to read next

- [Resource Crafts](/recipes/resource) — rebalance the per-tree output recipes
- [Mutations](/recipes/mutation) — add or remove sapling mutation paths
- [Targeting Recipes](/reference/targeting) — the full filter system for `event.remove`

## Learning KubeJS itself

This wiki covers Nostalgic Trees integration specifically. For general KubeJS documentation, see [kubejs.com](https://kubejs.com) — their wiki covers items, tags, events, and scripting patterns that aren't NT-specific.
