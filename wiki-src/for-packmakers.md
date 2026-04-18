# For Packmakers

What you can configure, script, and customize in Nostalgic Trees.

## Three integration points

**1. Tree configuration (JSON)** — define trees via files in `config/nostalgictrees/trees/`. Each file is a single tree. The mod auto-generates all textures, models, blockstates, recipes, loot tables, and tags for you. No scripting needed. See [Tree Config Schema](/trees/config).

**2. KubeJS recipe scripts** — add, remove, and modify the crafting recipes for chunks, resources, mutations, drying, saplings, and mallets. See [KubeJS Recipes → Getting Started](/recipes/getting-started).

**3. Tags** — every tree contributes items to auto-generated tags. Use these to make cross-mod compatibility recipes scale automatically as packs add trees. See [Tags](/reference/tags).

## Quick start

Want to add a custom tree that drops Mekanism uranium? Drop this at `config/nostalgictrees/trees/uranium.json`:

```json
{
  "name": "uranium",
  "tier": "tier_4",
  "output_item": "mekanism:raw_uranium",
  "output_count": 1,
  "color": "4ADE3F",
  "required_mod": "mekanism"
}
```

Restart the world. A full uranium tree exists — sapling, log, stripped log, leaves, apple, chunk, honeycomb, crafting recipe, loot tables, models, tags. The `required_mod` gate ensures it only loads when Mekanism is present.

Want to make the default iron resource recipe output 4 raw iron instead of 1? Drop this at `kubejs/server_scripts/iron_buff.js`:

```javascript
ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:raw_iron', mod: 'nostalgictrees' })
    event.shaped(
        Item.of('minecraft:raw_iron', 4),
        ['ACA', 'CHC', 'ACA'],
        {
            A: 'nostalgictrees:iron_apple',
            C: 'nostalgictrees:iron_chunk',
            H: 'nostalgictrees:iron_honeycomb'
        }
    ).id('kubejs:iron_resource_buffed')
})
```

Run `/reload`. Iron tree output is quadrupled.

## What's not configurable

Some behavior is locked in Java and can't be scripted:

- **Mallet log stripping** — the "use mallet on log → get stripped log + mallet damage" interaction is core mechanic, not a recipe. See [Known Limitations](/reference/limitations).
- **Bee pollination of saplings** — the tick logic that advances mutation progress.
- **Advanced Beehive UI and slot layout.**

Everything else in the mod goes through JSON (tree configs) or recipes (both vanilla and custom types), which means it's scriptable.

## Pages to read next

- [Tree Config Schema](/trees/config) — how to define custom trees
- [KubeJS → Getting Started](/recipes/getting-started) — setup and the basic patterns
- [Targeting Recipes](/reference/targeting) — the `id:`/`type:`/`output:`/`mod:` filter system
