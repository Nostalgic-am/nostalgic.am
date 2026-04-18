# Custom Trees

You add trees by dropping JSON files into `config/nostalgictrees/trees/`. The format is described in [Tree Config Schema](/trees/config). This page is a collection of worked examples for common use cases.

## Simple tree — vanilla output

A slime tree that drops 2 slime balls per craft. Tier 2 so it can be crafted directly (no mutation required).

**`config/nostalgictrees/trees/slime.json`**

```json
{
  "name": "slime",
  "tier": "tier_2",
  "output_item": "minecraft:slime_ball",
  "output_count": 2,
  "color": "5EF765"
}
```

Restart the world. You now have `nostalgictrees:slime_sapling`, `slime_log`, etc. To make the sapling obtainable, you'd need to add a crafting recipe via KubeJS — the mod doesn't auto-generate tier 2+ sapling recipes (those come from the default crafting chain or mutations).

See [Sapling Crafts](/recipes/sapling) for how to add the crafting recipe.

## Cross-mod tree

An uranium tree that only loads when Mekanism is present.

**`config/nostalgictrees/trees/uranium.json`**

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

When Mekanism is installed, the tree exists as a full Nostalgic Trees tree. When it isn't, the tree silently doesn't load — no errors, no missing items, nothing.

## Cross-mod tree with vanilla output

If a mod is usually installed alongside yours and you want to provide a tree specifically for that pack, you don't need `required_mod` when the output is vanilla:

**`config/nostalgictrees/trees/netherstar.json`**

```json
{
  "name": "netherstar",
  "tier": "tier_5",
  "output_item": "minecraft:nether_star",
  "output_count": 1,
  "color": "FAF4D9"
}
```

This works regardless of what other mods are present.

## Replacing a default tree

To replace a default, delete its file and add your own with the same name. Example — replacing the default `iron` tree with one that outputs iron ingots directly at higher count:

1. Delete `config/nostalgictrees/trees/iron.json`.
2. Create a new `config/nostalgictrees/trees/iron.json`:

```json
{
  "name": "iron",
  "tier": "tier_3",
  "output_item": "minecraft:iron_ingot",
  "output_count": 2,
  "color": "C9A78B"
}
```

Note that any KubeJS scripts referring to `nostalgictrees:iron_*` IDs continue to work — the items still exist under the same IDs. Only the recipe output changes.

## Disabling a default tree

The mod reads every JSON file in the trees folder. To disable a default tree, you can either:

**Option A — delete the file.** Simple, but it gets recreated if the folder is ever emptied (the mod writes defaults only if the folder is empty at startup).

**Option B — rename it.** Change `diamond.json` to `diamond.json.disabled`. The mod only loads `*.json` files, so this is ignored. Easy to re-enable later.

**Option C — set an impossible `required_mod`.** Add `"required_mod": "a_mod_that_will_never_exist"` to the JSON. The tree silently won't load. Self-documenting in that the file itself tells you why.

## Naming rules and gotchas

- `name` must be lowercase with only letters, digits, and underscores. No hyphens, no periods.
- `name` must be unique across all tree files. Two files with the same `name` → only one tree loads (the last one wins, nondeterministic).
- The filename and `name` don't have to match, but it's strongly recommended for clarity.
- The `name` becomes part of every generated ID. A tree named `iron_ore` produces `nostalgictrees:iron_ore_sapling` — picking a terrible name makes your recipes ugly.
- `color` is applied as a tint to a grayscale base texture. Very dark colors can make leaves look black; very light colors wash out. Aim for mid-saturation hex values.

## Tool for generating configs

Use the [Tree Config Generator](https://nostalgic.am/treeconfig/) to fill out a form and get valid JSON without writing it by hand. Handles the color picker and field validation.
