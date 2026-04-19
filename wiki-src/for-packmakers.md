# Packmakers

How to add in custom trees.

## Three integration points

**1. Tree configuration (JSON)** — define trees via files in `config/nostalgictrees/trees/`. Each file is a single tree. The mod auto-generates all textures, models, blockstates, recipes, loot tables, and tags for you. No scripting needed. See [Tree Config Schema](/trees/config).

**2. KubeJS recipe scripts** — add, remove, and modify the crafting recipes for chunks, resources, mutations, drying, saplings. See [KubeJS Recipes → Getting Started](/recipes/getting-started).

**3. Tags** — every tree contributes items to auto-generated tags. See [Tags](/reference/tags).

## Quick start
Use the [Tree Config Generator](https://nostalgic.am/treeconfig/) to quickly create trees!

Optionally you can write it yourself. Below is a quick example. 

Drop this at `config/nostalgictrees/trees/uranium.json`: 

```json
{
  "name": "uranium",
  "tier": "tier_4",
  "output_item": "mekanism:raw_uranium",
  "output_count": 1,
  "color": "4ADE3F",
  "required_mod": "mekanism" //<- optional field only used when mod is installed
}
```

Restart the world. A full uranium tree exists — sapling, log, stripped log, leaves, apple, chunk, honeycomb, crafting recipe, loot tables, models, tags. The `required_mod` gate ensures it only loads when Mekanism is present.

## Pages to read next

- [Tree Config Schema](/trees/config) — how to define custom trees
- [KubeJS → Getting Started](/recipes/getting-started) — setup and the basic patterns
- [Targeting Recipes](/reference/targeting) — the `id:`/`type:`/`output:`/`mod:` filter system
