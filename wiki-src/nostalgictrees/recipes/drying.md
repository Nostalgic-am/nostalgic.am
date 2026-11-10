# Drying

The drying rack recipe system. Custom recipe type — add and remove via KubeJS.

## Add Drying Recipe

```javascript
ServerEvents.recipes(event => {
    event.custom({
        type: 'nostalgictrees:drying',
        input: 'minecraft:kelp',
        output: 'minecraft:dried_kelp',
        drying_time: 200 //ex: 20 ticks -> 1 second
    }).id('kubejs:kelp_to_dried_kelp')
})
```

## Remove Drying Recipe

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
