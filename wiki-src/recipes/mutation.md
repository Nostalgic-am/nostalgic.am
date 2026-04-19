# Mutations

The bee-pollination system that transforms one sapling into another. Custom recipe type — add and remove via KubeJS.

## Add Mutation Recipe

```javascript
ServerEvents.recipes(event => {
    event.custom({
        type: 'nostalgictrees:mutation',
        base_sapling: 'nostalgictrees:experience_sapling',
        honeycombs: [
            'nostalgictrees:redstone_honeycomb',
            'nostalgictrees:iron_honeycomb',
            'nostalgictrees:experience_honeycomb'//
        ],
        result: 'nostalgictrees:gold_sapling',
        pollinations_required: 2,
        catalyst: 'minecraft:gold_nugget',
        catalyst_count: 4
    }).id('kubejs:yourcustomidhere')
})
```
## Remove Mutation Recipe

Every default mutation has an ID matching `nostalgictrees:<treename>_mutation`:

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:diamond_mutation' })
})
```

### Remove all mutations

```javascript
ServerEvents.recipes(event => {
    event.remove({ type: 'nostalgictrees:mutation' })
})
```

Useful when building a fully custom mutation tree from scratch.
