# Mallets

Crafting recipes for the mallet tools. Regular vanilla recipes.

## Default recipe IDs

| Recipe ID | Type | Pattern |
|---|---|---|
| `nostalgictrees:wooden_mallet` | shaped | 4 oak logs + 1 stick |
| `nostalgictrees:stone_mallet` | shaped | 4 cobblestone + 1 stick |
| `nostalgictrees:iron_mallet` | shaped | 4 iron blocks + 1 stick |
| `nostalgictrees:golden_mallet` | shaped | 4 gold blocks + 1 stick |
| `nostalgictrees:diamond_mallet` | shaped | 4 diamond blocks + 1 stick |
| `nostalgictrees:netherite_mallet` | smithing transform | diamond mallet + netherite ingot |

The mallet pattern for tier-block recipes is:

```
 HH
 HH
S  
```

Where `H` = the tier block and `S` = stick.

## Remove

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:iron_mallet' })
})
```

## Add — cheaper recipe

Use iron ingots instead of iron blocks.

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:iron_mallet' })
    
    event.shaped(
        'nostalgictrees:iron_mallet',
        [
            ' II',
            ' II',
            'S  '
        ],
        {
            I: 'minecraft:iron_ingot',
            S: 'minecraft:stick'
        }
    ).id('kubejs:iron_mallet_cheaper')
})
```

## Add — custom mallet source

For packs that gate tools behind a different progression (e.g., a steel-tier mod), add an alternate route:

```javascript
ServerEvents.recipes(event => {
    event.shaped(
        'nostalgictrees:iron_mallet',
        [
            ' HH',
            ' HH',
            'S  '
        ],
        {
            H: 'somemod:steel_block',
            S: 'somemod:steel_rod'
        }
    ).id('kubejs:iron_mallet_from_steel')
})
```

Both recipes (default iron mallet and this steel alternate) coexist — the player can craft via either. JEI shows both.

## Netherite mallet — smithing, not crafting

The netherite mallet uses vanilla's smithing template system. To rebuild it via KubeJS:

```javascript
ServerEvents.recipes(event => {
    event.remove({ id: 'nostalgictrees:netherite_mallet' })
    
    event.smithing(
        'nostalgictrees:netherite_mallet',
        'minecraft:netherite_upgrade_smithing_template',
        'nostalgictrees:diamond_mallet',
        'minecraft:netherite_ingot'
    ).id('kubejs:netherite_mallet_custom')
})
```

`event.smithing(result, template, base, addition)` matches vanilla smithing transform semantics — the player places all three items in the smithing table and gets the result.

## Changing durability or efficiency

Mallet durability and tier-cost-multiplier are defined in Java (in `MalletTier`). KubeJS can't modify them. Those are mod-level balance values, not scriptable.
