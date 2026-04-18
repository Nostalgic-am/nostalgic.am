# Targeting Recipes

The `event.remove` filter system lets you select which recipes to remove. This page explains every filter, when to use it, and one quirk specific to Nostalgic Trees.

## Filter types

`event.remove` accepts an object with one or more filters. Multiple filters combine with AND logic.

```javascript
event.remove({
    id:     'namespace:path' | /regex/,      // match by recipe ID
    type:   'recipe:type',                    // match by recipe type
    mod:    'namespace',                      // match by ID namespace
    output: 'item:id' | '#tag_id',            // match by result item
    input:  'item:id' | '#tag_id',            // match by any ingredient
})
```

## When to use which

### `id:` — targeting one specific recipe

The most precise option. Use when you know the exact recipe you want to remove.

```javascript
event.remove({ id: 'nostalgictrees:iron_resource' })
```

Also accepts regex for pattern matching:

```javascript
// Every recipe whose ID starts with "nostalgictrees:" and ends with "_resource"
event.remove({ id: /^nostalgictrees:.+_resource$/ })
```

### `type:` — targeting a whole category

Use when removing a class of recipes all at once.

```javascript
// Delete every mutation recipe in the game
event.remove({ type: 'nostalgictrees:mutation' })

// Delete every drying recipe
event.remove({ type: 'nostalgictrees:drying' })
```

### `mod:` — scoping to one mod

Use as a filter alongside `output:` or `input:` to avoid accidentally affecting other mods.

```javascript
// Only removes recipes whose IDs are in the "nostalgictrees" namespace
event.remove({ output: 'minecraft:raw_iron', mod: 'nostalgictrees' })
```

Without the `mod:` filter, this would also remove vanilla iron smelting. Always scope `output:` filters with `mod:` or `type:` when you don't want to affect vanilla.

### `output:` — targeting by result

Use when you want to remove recipes that produce a specific item, regardless of how.

```javascript
// All recipes producing raw gold
event.remove({ output: 'minecraft:raw_gold' })

// Scoped to just NT's crafting recipes
event.remove({ output: 'minecraft:raw_gold', mod: 'nostalgictrees' })
```

::: warning Mutations don't report output
The `output:` filter doesn't work on mutation recipes — they return empty from the result method, so KubeJS can't match them. Use `id:` or `type:` for mutations. Drying recipes work correctly.
:::

### `input:` — targeting by ingredient

Use when removing every recipe that consumes a particular item.

```javascript
// Every recipe that uses iron chunks as an ingredient
event.remove({ input: 'nostalgictrees:iron_chunk' })

// Tag-based
event.remove({ input: '#nostalgictrees:resource_chunks' })
```

## Combining filters

Multiple filters stack with AND logic — all must match.

```javascript
// Remove: shaped recipes from NT that produce raw iron
event.remove({
    type: 'minecraft:crafting_shaped',
    mod: 'nostalgictrees',
    output: 'minecraft:raw_iron'
})
```

This is precise — it targets exactly the NT iron resource recipe, not vanilla smelting and not any mutation recipe.

## Choosing a filter — decision tree

**Q: Do you know the exact recipe ID?**
→ Yes → use `id:`

**Q: Do you want to delete all recipes of a type?**
→ Yes → use `type:`

**Q: Do you want to delete all ways to produce/consume an item?**
→ Be careful with scope. Combine `output:` or `input:` with `mod:` or `type:` to avoid breaking vanilla or other mods.

**Q: Do you want to target mutation recipes by their output sapling?**
→ Not currently possible. Use `id:` or `type:` instead. See the warning above.

## Common patterns

### Remove and replace

```javascript
// Remove default, add replacement
event.remove({ id: 'nostalgictrees:iron_resource' })
event.shaped(Item.of('minecraft:raw_iron', 4), ['ACA', 'CHC', 'ACA'], {
    A: 'nostalgictrees:iron_apple',
    C: 'nostalgictrees:iron_chunk',
    H: 'nostalgictrees:iron_honeycomb'
}).id('kubejs:iron_resource_buffed')
```

### Wipe and rebuild

```javascript
// Clear all NT mutations, then add custom ones
event.remove({ type: 'nostalgictrees:mutation' })

event.custom({ type: 'nostalgictrees:mutation', /* ... */ }).id('kubejs:my_mutation_1')
event.custom({ type: 'nostalgictrees:mutation', /* ... */ }).id('kubejs:my_mutation_2')
```

### Scoped bulk removal

```javascript
// Remove all NT chunk crafts at once
event.remove({ id: /^nostalgictrees:.+_chunk$/ })
```

## Debugging when a remove does nothing

`event.remove` fails silently. If nothing seems to happen:

1. Run `/kubejs dump`
2. Open `kubejs/exported/recipes.txt`
3. Search for the ID you're trying to remove — if it's not there, your target doesn't exist
4. Check for typos (`nostalgictrees`, not `nostalgic_trees` or `nostalgictree`)
5. Check the exact path — defaults follow the patterns documented in [Recipe IDs](/reference/recipe-ids), but custom trees follow their tree's `name`
