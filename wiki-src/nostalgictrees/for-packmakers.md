# Packmakers

How to add in custom trees.

## Three integration points

**1. Tree configuration (JSON)** — define trees via files in `config/nostalgictrees/trees/`. Each file is a single tree. The mod auto-generates all textures, models, blockstates, recipes, loot tables, and tags for you. No scripting needed. See [Tree Config Schema](/trees/config).

**2. KubeJS recipe scripts** — add, remove, and modify the crafting recipes for chunks, resources, mutations, drying, saplings. See [Mutations](/recipes/mutation) and [Drying](/recipes/drying).

**3. Tags** — every tree contributes items to auto-generated tags. See [What gets generated automatically](/trees/config#what-gets-generated-automatically).

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
  "required_mod": "mekanism"
}
```

`required_mod` is optional: the tree only loads when that mod is installed.

Restart the world. A full uranium tree exists — sapling, log, stripped log, leaves, apple, chunk, honeycomb, crafting recipe, loot tables, models, tags. The `required_mod` gate ensures it only loads when Mekanism is present.

## Pages to read next

- [Tree Config Schema](/trees/config) — how to define custom trees
- [Mutations](/recipes/mutation) — add and remove bee mutation recipes with KubeJS
- [Drying](/recipes/drying) — add and remove drying rack recipes with KubeJS
