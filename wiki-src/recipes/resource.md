# Resource Crafts

The recipe that turns tree products into the actual output item. Every tree automatically gets one.

## Default pattern

For a tree named `<tree>`, the generated recipe is:

- **Type:** `minecraft:crafting_shaped`
- **ID:** `nostalgictrees:<tree>_resource`
- **Pattern:** `ACA` / `CHC` / `ACA`
- **Ingredients:**
  - `A` = `nostalgictrees:<tree>_apple` (4)
  - `C` = `nostalgictrees:<tree>_chunk` (4)
  - `H` = `nostalgictrees:<tree>_honeycomb` (1)
- **Output:** the tree's `output_item`, with count `output_count`

For the iron tree: 4 iron apples + 4 iron chunks + 1 iron honeycomb → 1 raw iron.

## Remove

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:iron_resource' })
})
```

Or by output, scoped to the mod to avoid killing vanilla smelting:

```javascript
ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:raw_iron', mod: 'nostalgictrees' })
})
```

## Remove all resource crafts

Kills every tree's resource craft at once. Useful for packs designing their own tree progression.

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: /^nostalgictrees:.+_resource$/ })
})
```

## Add — buffed version of an existing tree

Four raw iron instead of one, same ingredients.

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:iron_resource' })
    
    event.shaped(
        Item.of('minecraft:raw_iron', 4),
        [
            'ACA',
            'CHC',
            'ACA'
        ],
        {
            A: 'nostalgictrees:iron_apple',
            C: 'nostalgictrees:iron_chunk',
            H: 'nostalgictrees:iron_honeycomb'
        }
    ).id('kubejs:iron_resource_buffed')
})
```

### Walkthrough

`event.remove({ id: ... })` deletes the default before we add the replacement — without this step both recipes would exist and JEI would show two ways to produce raw iron from the same tree.

`event.shaped(output, pattern, key)` is KubeJS's typed builder for vanilla shaped recipes. The pattern is three strings, one per row of the crafting grid. Each character in the pattern references a key in the third argument.

`Item.of('minecraft:raw_iron', 4)` wraps the item ID with a count. If you only pass a string, you get 1. The count is what goes in the result slot.

`.id('kubejs:iron_resource_buffed')` assigns a unique recipe ID. Convention: use `kubejs:` as the namespace for scripted recipes. Descriptive path so `event.remove` can target it later.

## Add — accept any NT honeycomb (tag-based)

Uses the auto-generated `nostalgictrees:resource_honeycombs` tag, so players can use whatever honeycomb they have in the center slot.

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:gold_resource' })
    
    event.shaped(
        'minecraft:raw_gold',
        [
            'ACA',
            'CHC',
            'ACA'
        ],
        {
            A: 'nostalgictrees:gold_apple',
            C: 'nostalgictrees:gold_chunk',
            H: '#nostalgictrees:resource_honeycombs'
        }
    ).id('kubejs:gold_resource_any_comb')
})
```

Tag references in KubeJS use `#namespace:tag_name`. See [Tags](/reference/tags) for the full list of available tags.

## Add — cheaper recipe, fewer ingredients

For packs that want NT to feel lighter. Three chunks in a row, skipping apples and honeycomb entirely.

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:iron_resource' })
    
    event.shapeless(
        'minecraft:raw_iron',
        [
            'nostalgictrees:iron_chunk',
            'nostalgictrees:iron_chunk',
            'nostalgictrees:iron_chunk'
        ]
    ).id('kubejs:iron_chunks_to_raw_iron')
})
```

`event.shapeless` takes the output and an array of ingredients. Order doesn't matter — the player can place them anywhere in the crafting grid.

## Helper pattern — rebalance many trees at once

For packs adjusting a lot of trees, extract a helper function:

```javascript
ServerEvents.recipes(event => {
    function ntResource(tree, outputItem, outputCount, id) {
        event.remove({ id: `nostalgictrees:${tree}_resource` })
        event.shaped(
            Item.of(outputItem, outputCount),
            ['ACA', 'CHC', 'ACA'],
            {
                A: `nostalgictrees:${tree}_apple`,
                C: `nostalgictrees:${tree}_chunk`,
                H: `nostalgictrees:${tree}_honeycomb`
            }
        ).id(id)
    }
    
    ntResource('iron',   'minecraft:raw_iron',   4, 'kubejs:iron_buffed')
    ntResource('gold',   'minecraft:raw_gold',   4, 'kubejs:gold_buffed')
    ntResource('copper', 'minecraft:raw_copper', 8, 'kubejs:copper_buffed')
})
```

Ten lines to rebalance the entire ore-tree economy.
