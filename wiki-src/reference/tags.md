# Tags

Nostalgic Trees auto-generates tags for every tree on world load. Use these in recipes to write rules that scale to any number of trees.

## Why tags matter

A recipe that accepts `#nostalgictrees:resource_chunks` works for every tree that exists — defaults and custom. Packmakers don't have to update their scripts when new trees are added via config.

Compare:

```javascript
// Without tags — breaks when new trees are added
event.shapeless('minecraft:netherrack', [
    'nostalgictrees:iron_chunk',
    'nostalgictrees:copper_chunk',
    'nostalgictrees:gold_chunk',
    // ...need to list every chunk manually
])

// With tags — works automatically for all trees
event.shapeless('minecraft:netherrack', [
    '#nostalgictrees:resource_chunks',
    '#nostalgictrees:resource_chunks',
    '#nostalgictrees:resource_chunks'
])
```

## Mod-specific tags

All under the `nostalgictrees:` namespace.

### Item tags

| Tag | Contents |
|---|---|
| `nostalgictrees:resource_apples` | Every `<tree>_apple` item |
| `nostalgictrees:resource_chunks` | Every `<tree>_chunk` item |
| `nostalgictrees:resource_honeycombs` | Every `<tree>_honeycomb` item |

### Block tags

| Tag | Contents |
|---|---|
| `nostalgictrees:resource_logs` | Every `<tree>_log` block |
| `nostalgictrees:stripped_resource_logs` | Every `stripped_<tree>_log` block |
| `nostalgictrees:resource_leaves` | Every `<tree>_leaves` block |
| `nostalgictrees:resource_saplings` | Every `<tree>_sapling` block |

## Vanilla tags NT contributes to

Every tree's blocks are automatically added to standard Minecraft tags, so vanilla mechanics (fire spread, leaf decay, tool correctness) treat them correctly.

| Vanilla tag | NT contributions |
|---|---|
| `minecraft:logs` | All resource logs |
| `minecraft:leaves` | All resource leaves |
| `minecraft:saplings` | All resource saplings |
| `minecraft:flowers` | All resource saplings (for bee pollination) |
| `minecraft:mineable/axe` | All resource logs and stripped logs |
| `minecraft:mineable/hoe` | All resource leaves |

## Using tags in KubeJS

### As recipe ingredients

Prefix the tag ID with `#`:

```javascript
event.shaped(
    'minecraft:raw_gold',
    ['ACA', 'CHC', 'ACA'],
    {
        A: 'nostalgictrees:gold_apple',
        C: 'nostalgictrees:gold_chunk',
        H: '#nostalgictrees:resource_honeycombs'
    }
).id('kubejs:gold_resource_any_comb')
```

Any NT honeycomb satisfies the `H` slot.

### In event.remove filters

Use `input:` or `output:` with a tag:

```javascript
// Remove every recipe that takes any NT chunk as input
event.remove({ input: '#nostalgictrees:resource_chunks' })
```

### For bulk operations

Add NT chunks to a common cross-mod tag so other mods' machines recognize them:

```javascript
ServerEvents.tags('item', event => {
    // Register all NT chunks as raw materials for mods that use the c: namespace
    event.add('c:raw_materials', '#nostalgictrees:resource_chunks')
})
```

This is an example pattern — the actual tag names other mods use vary. Check the target mod's documentation.

## Custom trees get tags automatically

When you add a tree via `config/nostalgictrees/trees/<name>.json`, all of its items are added to the relevant tags automatically on the next world load. No script changes required.

This is the main argument for writing scripts against tags rather than specific item IDs: the pack stays working when trees are added or removed.
