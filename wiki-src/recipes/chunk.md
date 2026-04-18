# Chunk Crafts

The recipe that turns a stripped log into a chunk. One per tree, auto-generated.

## Default pattern

For a tree named `<tree>`:

- **Type:** `minecraft:crafting_shapeless`
- **ID:** `nostalgictrees:<tree>_chunk`
- **Ingredients:** 1 × `nostalgictrees:stripped_<tree>_log`
- **Output:** 1 × `nostalgictrees:<tree>_chunk`

One stripped log, one chunk. No extras.

## Remove

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:iron_chunk' })
})
```

## Remove all chunk crafts

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: /^nostalgictrees:.+_chunk$/ })
})
```

::: warning Regex scope
This pattern matches **exactly** `nostalgictrees:<something>_chunk`. Because of the `$` at the end, it won't match IDs like `nostalgictrees:iron_chunk_from_something`. If future updates add new chunk-related recipes, double-check the regex still targets only what you want.
:::

## Add — harder chunk recipe

Require two stripped logs per chunk, making chunks twice as expensive.

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:iron_chunk' })
    
    event.shapeless(
        'nostalgictrees:iron_chunk',
        [
            'nostalgictrees:stripped_iron_log',
            'nostalgictrees:stripped_iron_log'
        ]
    ).id('kubejs:iron_chunk_harder')
})
```

## Add — sawmill cross-compat

If your pack has a sawmill mod with its own recipe type, you can add a parallel route:

```javascript
ServerEvents.recipes(event => {
    // Keep the default crafting table recipe, add a sawmill route
    event.custom({
        type: 'somemod:sawmill',
        input: 'nostalgictrees:stripped_iron_log',
        output: 'nostalgictrees:iron_chunk',
        count: 2
    }).id('kubejs:iron_chunk_sawmill')
})
```

This is just a shape to adapt for whatever sawmill mod the pack uses. Read that mod's recipe JSON format and mirror it in `event.custom`.

## Why touch chunk crafts

Most packs leave these alone — they're a simple passthrough recipe. Common reasons to change them:

- **Balance**: make chunks more expensive by requiring multiple logs
- **Add alternate routes**: let crushers, sawmills, mechanical hammers produce chunks too
- **Gate progression**: remove chunk crafts entirely to force players through a different extraction method (e.g., a pack's custom refining machine)
