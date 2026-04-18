# Drying

The drying rack recipe system. Custom recipe type — add and remove via KubeJS.

## Recipe type

`nostalgictrees:drying`

## Schema

```json
{
  "type": "nostalgictrees:drying",
  "input": "minecraft:clay_ball",
  "output": "minecraft:bone_meal",
  "output_count": 1,
  "drying_time": 600
}
```

### Fields

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | string | yes | — | Must be `nostalgictrees:drying` |
| `input` | item ID | yes | — | The item placed on the drying rack |
| `output` | item ID | yes | — | The item produced when drying completes |
| `output_count` | integer | no | `1` | How many of `output` are produced per cycle |
| `drying_time` | integer | no | `600` | Time in ticks before the drying completes. 20 ticks = 1 second. Default = 30 seconds. |

## Add

```javascript
ServerEvents.recipes(event => {
    event.custom({
        type: 'nostalgictrees:drying',
        input: 'minecraft:kelp',
        output: 'minecraft:dried_kelp',
        drying_time: 200
    }).id('kubejs:kelp_to_dried_kelp')
})
```

### Walkthrough

`event.custom(...)` passes the JSON to the drying recipe serializer. Only `input` and `output` are strictly required — `output_count` defaults to 1 and `drying_time` to 600 if omitted.

`drying_time: 200` means 10 seconds. Set shorter for faster recipes, longer for slow/valuable conversions.

## Remove

### By ID

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:dirt_to_stone_sapling' })
})
```

### By output

Unlike mutations, drying recipes correctly report their output, so output-based filtering works:

```javascript
ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:bone_meal', type: 'nostalgictrees:drying' })
})
```

### Remove all drying recipes

```javascript
ServerEvents.recipes(event => {
    event.remove({ type: 'nostalgictrees:drying' })
})
```

## Default drying recipe IDs

| ID | Transforms |
|---|---|
| `nostalgictrees:dirt_to_stone_sapling` | dirt sapling → stone sapling |
| `nostalgictrees:clay_ball_to_bone_meal` | clay ball → bone meal |
| `nostalgictrees:bone_block_to_snow_block` | bone block → snow block |

## Examples

### Replace wet sponge drying

Vanilla Minecraft smelts wet sponge to dry sponge. For packs without easy access to fuel, make the drying rack do it faster.

```javascript
ServerEvents.recipes(event => {
    event.custom({
        type: 'nostalgictrees:drying',
        input: 'minecraft:wet_sponge',
        output: 'minecraft:sponge',
        drying_time: 400
    }).id('kubejs:wet_sponge_to_sponge')
})
```

### Slow leather route

For packs that want alternate leather sources, dry rotten flesh. Set a long time so it's still a commitment.

```javascript
ServerEvents.recipes(event => {
    event.custom({
        type: 'nostalgictrees:drying',
        input: 'minecraft:rotten_flesh',
        output: 'minecraft:leather',
        drying_time: 2400
    }).id('kubejs:rotten_flesh_to_leather')
})
```

### Bulk output

Drying one item into multiple:

```javascript
ServerEvents.recipes(event => {
    event.custom({
        type: 'nostalgictrees:drying',
        input: 'minecraft:packed_mud',
        output: 'minecraft:dried_kelp',
        output_count: 4,
        drying_time: 800
    }).id('kubejs:packed_mud_to_dried_kelp_bulk')
})
```

## Gotchas

### One input type per recipe

The `input` field takes a single item ID. Tags aren't supported by the current schema — you can't write a drying recipe that accepts "any clay-like item." For multiple inputs, write multiple recipes.

### Drying time is per-recipe, not per-rack

Each drying rack processes one item at a time using the recipe's `drying_time`. Two racks = two simultaneous drying operations.
