# Mutations

The bee-pollination system that transforms one sapling into another. Custom recipe type — add and remove via KubeJS.

## Recipe type

`nostalgictrees:mutation`

## Schema

```json
{
  "type": "nostalgictrees:mutation",
  "base_sapling": "nostalgictrees:experience_sapling",
  "honeycombs": [
    "nostalgictrees:redstone_honeycomb",
    "nostalgictrees:iron_honeycomb"
  ],
  "result": "nostalgictrees:gold_sapling",
  "pollinations_required": 2,
  "catalyst": "minecraft:gold_nugget",
  "catalyst_count": 4
}
```

### Fields

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | string | yes | — | Must be `nostalgictrees:mutation` |
| `base_sapling` | item ID | yes | — | The sapling that must be planted to start the mutation |
| `honeycombs` | array of item IDs | yes | — | List of honeycombs the player right-clicks onto the sapling. Duplicates are allowed and count separately (two `redstone_honeycomb` entries = need two redstone honeycombs). |
| `result` | item ID | yes | — | The sapling the base transforms into when mutation completes |
| `pollinations_required` | integer | no | `3` | Number of full bee pollination cycles before the transformation triggers |
| `catalyst` | item ID | no | — | Optional. If present, the player must right-click with this item to consume it before pollination begins |
| `catalyst_count` | integer | no | `0` | How many of the catalyst item must be consumed. Required if `catalyst` is specified. |

::: info One catalyst type per recipe
Only one catalyst item type is supported per recipe. For a recipe needing multiple catalyst types, use the `honeycombs` list for extras (though it's called honeycombs, the schema itself doesn't enforce what items go in it — but doing this is confusing and not recommended).
:::

## Add

```javascript
ServerEvents.recipes(event => {
    event.custom({
        type: 'nostalgictrees:mutation',
        base_sapling: 'nostalgictrees:experience_sapling',
        honeycombs: [
            'nostalgictrees:redstone_honeycomb',
            'nostalgictrees:iron_honeycomb',
            'nostalgictrees:experience_honeycomb'
        ],
        result: 'nostalgictrees:gold_sapling',
        pollinations_required: 2,
        catalyst: 'minecraft:gold_nugget',
        catalyst_count: 4
    }).id('kubejs:experience_to_gold_mutation')
})
```

### Walkthrough

`event.custom(...)` accepts raw JSON and passes it to the mod's recipe serializer. This is how you add recipes for non-vanilla types. The object's structure must match the schema above exactly — field names, types, required vs optional.

The `honeycombs` array lists each honeycomb the player must apply. Duplicates matter: listing `redstone_honeycomb` twice means the player needs to use two separate redstone honeycombs.

`pollinations_required: 2` means 2 full bee cycles. A full cycle is when a bee leaves the hive, flies to the sapling, pollinates it, and returns. Lower numbers = faster mutation.

The catalyst is optional but atomic — either both `catalyst` and `catalyst_count` are present, or neither is. Setting `catalyst_count: 0` with a catalyst ID is treated as no catalyst.

## Remove

### By ID

Every default mutation has an ID matching `nostalgictrees:<resulttree>_mutation`:

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

## Default mutation recipe IDs

| ID | Produces |
|---|---|
| `nostalgictrees:copper_mutation` | copper sapling |
| `nostalgictrees:iron_mutation` | iron sapling |
| `nostalgictrees:redstone_mutation` | redstone sapling |
| `nostalgictrees:amethyst_mutation` | amethyst sapling |
| `nostalgictrees:prismarine_mutation` | prismarine sapling |
| `nostalgictrees:experience_mutation` | experience sapling |
| `nostalgictrees:quartz_mutation` | quartz sapling |
| `nostalgictrees:gold_mutation` | gold sapling |
| `nostalgictrees:lapis_mutation` | lapis sapling |
| `nostalgictrees:glowstone_mutation` | glowstone sapling |
| `nostalgictrees:diamond_mutation` | diamond sapling |
| `nostalgictrees:emerald_mutation` | emerald sapling |
| `nostalgictrees:obsidian_mutation` | obsidian sapling |
| `nostalgictrees:netherite_mutation` | netherite sapling |

## Replace a default mutation

Common pattern: remove a default, add an easier/harder version.

```javascript
ServerEvents.recipes(event => {
    // Make the diamond mutation significantly easier for casual packs
    event.remove({ id: 'nostalgictrees:diamond_mutation' })
    
    event.custom({
        type: 'nostalgictrees:mutation',
        base_sapling: 'nostalgictrees:emerald_sapling',
        honeycombs: [
            'nostalgictrees:gold_honeycomb',
            'nostalgictrees:quartz_honeycomb'
        ],
        result: 'nostalgictrees:diamond_sapling',
        pollinations_required: 5
    }).id('kubejs:diamond_mutation_easy')
})
```

## Gotchas

### Sapling items, not block states

The `base_sapling` and `result` fields take **item IDs**, not block IDs. Both happen to be the same string (`nostalgictrees:iron_sapling`), but conceptually the mutation recipe references the item form.

### Mutation recipes don't report output through `event.remove({ output: ... })`

Currently, you can't remove mutations by their result sapling:

```javascript
// This does NOT work — matches zero recipes
event.remove({ output: 'nostalgictrees:diamond_sapling' })
```

Use the recipe ID instead, or `type: 'nostalgictrees:mutation'` to wipe them all. See [Targeting Recipes](/reference/targeting) for the full explanation.

### Pollinations need a hive with bees

Mutations don't progress without an Advanced Beehive nearby with bees inside. This isn't a recipe concern, but it's worth noting — a correctly-configured mutation recipe will appear stuck if there's no bee activity.
