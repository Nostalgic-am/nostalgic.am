# Sapling Crafts

How players bootstrap into the mod — the crafting recipes for tier 1 saplings. Regular vanilla recipes, not a custom type.

## Default recipe IDs

Only tier 1 saplings have crafting recipes. Higher-tier saplings come from drying (stone sapling) or mutations (tier 2+).

| Recipe ID | Produces | Pattern |
|---|---|---|
| `nostalgictrees:dirt_sapling` | dirt sapling | 8 dirt surrounding an oak sapling |
| `nostalgictrees:gravel_sapling_from_smelting` | gravel sapling | smelt stone sapling |
| `nostalgictrees:sand_sapling_from_smelting` | sand sapling | smelt gravel sapling |
| `nostalgictrees:clay_sapling` | clay sapling | dirt/stone/gravel/sand saplings around oak sapling |
| `nostalgictrees:bone_sapling` | bone sapling | 8 bone meal around sand sapling |
| `nostalgictrees:coal_sapling` | coal sapling | 8 charcoal around clay sapling |
| `nostalgictrees:ice_sapling` | ice sapling | 8 ice around clay sapling |
| `nostalgictrees:rgb_sapling` | rgb sapling | special (see source) |

(Stone sapling isn't crafted — it comes from drying a dirt sapling on a drying rack.)

## Add

A simpler dirt sapling recipe — two grass blocks plus an oak sapling.

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:dirt_sapling' })
    
    event.shapeless(
        'nostalgictrees:dirt_sapling',
        [
            'minecraft:grass_block',
            'minecraft:grass_block',
            'minecraft:oak_sapling'
        ]
    ).id('kubejs:dirt_sapling_from_grass')
})
```

## Remove — disable a tier 1 sapling entry

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:bone_sapling' })
})
```

The bone sapling item still exists; it's just unobtainable from crafting. If the pack doesn't provide another way to get it (loot, trades, a cross-mod recipe), that sapling line is gated off.

## Remove all tier 1 saplings

Useful for packs that want to provide saplings only through loot, trading, or quest rewards:

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: [
        'nostalgictrees:dirt_sapling',
        'nostalgictrees:gravel_sapling_from_smelting',
        'nostalgictrees:sand_sapling_from_smelting',
        'nostalgictrees:clay_sapling',
        'nostalgictrees:bone_sapling',
        'nostalgictrees:coal_sapling',
        'nostalgictrees:ice_sapling',
        'nostalgictrees:rgb_sapling'
    ]})
})
```

## Add crafting recipes for custom trees

When you add a custom tree via config JSON, it gets all items and tags but **no crafting recipe**. For tier 2+ trees, that's fine — they're meant to come from mutations. For tier 1 custom trees, you need to provide a recipe yourself.

Example for a hypothetical `slime` tree:

```javascript
ServerEvents.recipes(event => {
    // 8 slime balls around an oak sapling → slime sapling
    event.shaped(
        'nostalgictrees:slime_sapling',
        [
            'SSS',
            'SOS',
            'SSS'
        ],
        {
            S: 'minecraft:slime_ball',
            O: 'minecraft:oak_sapling'
        }
    ).id('kubejs:slime_sapling')
})
```

## Tier 2+ saplings

For higher-tier trees, the intended path is mutation, not crafting. See [Mutations](/recipes/mutation) to add or modify mutation recipes.

If you want a tier 2+ sapling to be craftable for a pack-specific reason, add a recipe yourself as with the custom tree example above — the mod doesn't care whether a sapling came from a mutation, crafting, or loot.
