# Tree Config Schema

Every tree in Nostalgic Trees is defined by a JSON file at `config/nostalgictrees/trees/<treename>.json`. Each file is a single tree. The file's location is the only thing that links it to the mod — the filename itself is conventional but doesn't have to match the `name` field.

On first launch, the mod writes 23 default trees to this folder. You can delete, edit, or add to them freely. Changes take effect on the next world load.

## Schema

```json
{
  "name": "iron",
  "tier": "tier_3",
  "output_item": "minecraft:raw_iron",
  "output_count": 1,
  "color": "C9A78B",
  "required_mod": "minecraft"
}
```

### Fields

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `name` | string | yes | — | Tree name. Used in all generated IDs: `<name>_sapling`, `<name>_log`, etc. Must be lowercase, letters/digits/underscores only. |
| `tier` | string | no | `tier_1` | One of `tier_1` through `tier_5`. Affects mallet durability cost when harvesting logs. |
| `output_item` | string | yes | — | The item produced by the tree's resource recipe. Full ID with namespace (`minecraft:raw_iron`, `mekanism:raw_uranium`). |
| `output_count` | integer | no | `1` | How many of `output_item` produced per resource recipe craft. |
| `color` | string | no | `FFFFFF` | Hex color (no `#`) tinting leaves, chunks, apples, honeycombs. Six characters. |
| `required_mod` | string | no | — | If set, the tree only loads when this modid is present. Useful for cross-mod trees (uranium for Mekanism, mana steel for Botania, etc). |

## Tier reference

| Tier | Durability cost per log | Intended use |
|---|---|---|
| `tier_1` | 1 | Base materials: dirt, sand, gravel, clay, bone |
| `tier_2` | 2 | Cheap resources: coal, copper |
| `tier_3` | 4 | Mid-tier: iron, quartz, redstone |
| `tier_4` | 8 | Valuable: gold, lapis, glowstone |
| `tier_5` | 16 | Endgame: diamond, emerald, netherite |

Durability cost is per log broken, scaled by mallet tier (netherite mallets use less, wood mallets use full cost). Higher-tier trees on a wood mallet can break it in one log.

## What gets generated automatically

When you add a tree JSON, on the next world load the mod generates:

- 7 items: `<name>_sapling`, `<name>_log`, `stripped_<name>_log`, `<name>_leaves`, `<name>_apple`, `<name>_chunk`, `<name>_honeycomb`
- Blockstates, block models, item models (colored via the `color` field)
- Loot tables for the log, stripped log, leaves, sapling
- Two crafting recipes: `<name>_chunk` (stripped log → chunk) and `<name>_resource` (4 apples + 4 chunks + 1 honeycomb → output item)
- Tag entries in `nostalgictrees:resource_logs`, `resource_leaves`, `resource_saplings`, `resource_apples`, `resource_chunks`, `resource_honeycombs`, plus vanilla `minecraft:logs`, `minecraft:leaves`, `minecraft:saplings`, and mineable tags
- Language entries

You don't write any of this yourself. Add the JSON, restart, it exists.

## Generator tool

If writing JSON by hand is tedious, use the [Tree Config Generator](https://nostalgic.am/treeconfig/) — fill out a form, copy the result, drop into your config folder.

## Example: cross-mod tree

A slime tree that only loads when the slime mod is installed:

```json
{
  "name": "slime",
  "tier": "tier_2",
  "output_item": "minecraft:slime_ball",
  "output_count": 2,
  "color": "5EF765"
}
```

No `required_mod` here because slime balls are vanilla. For a tree gated on Mekanism being present:

```json
{
  "name": "osmium",
  "tier": "tier_3",
  "output_item": "mekanism:raw_osmium",
  "output_count": 1,
  "color": "A8A8B0",
  "required_mod": "mekanism"
}
```

If Mekanism isn't installed, the tree silently doesn't load. No error, no missing items, no broken recipes — the tree just isn't there.
