# Default Trees

The 23 trees shipped with the mod. These get written to `config/nostalgictrees/trees/` on first launch if the folder is empty.

## Tier 1 — Base materials

Obtained through crafting recipes. No mutations required.

| Tree | Output | Count | Color |
|---|---|---|---|
| `dirt` | `minecraft:dirt` | 4 | `#8B5E2B` |
| `stone` | `minecraft:cobblestone` | 4 | `#7B7B7B` |
| `sand` | `minecraft:sand` | 4 | `#DBD3A0` |
| `gravel` | `minecraft:gravel` | 4 | `#7E7A73` |
| `clay` | `minecraft:clay_ball` | 4 | `#9EA4B0` |
| `bone` | `minecraft:bone` | 2 | `#E3DAC2` |

## Tier 2 — Utility

Crafted or mutated. 5 pollinations for mutations.

| Tree | Output | Count | Color |
|---|---|---|---|
| `ice` | `minecraft:ice` | 2 | `#A5D6F5` |
| `rgb` | `nostalgictrees:rgb_dye` | 4 | `#FFFFFF` |
| `coal` | `minecraft:coal` | 2 | `#2C2C2C` |
| `copper` | `minecraft:raw_copper` | 2 | `#C06840` |
| `iron` | `minecraft:raw_iron` | 1 | `#C9A78B` |

## Tier 3 — Mid game

Mutation only. 5 pollinations, no catalyst.

| Tree | Output | Count | Color |
|---|---|---|---|
| `redstone` | `minecraft:redstone` | 3 | `#A01010` |
| `amethyst` | `minecraft:amethyst_shard` | 2 | `#9B6BC4` |
| `prismarine` | `minecraft:prismarine_shard` | 2 | `#5B9E8F` |
| `experience` | `minecraft:experience_bottle` | 1 | `#A8E830` |

## Tier 4 — Valuables

Mutation with catalyst. 7 pollinations.

| Tree | Output | Count | Color |
|---|---|---|---|
| `quartz` | `minecraft:quartz` | 2 | `#E8DDD0` |
| `gold` | `minecraft:raw_gold` | 1 | `#F5D63D` |
| `lapis` | `minecraft:lapis_lazuli` | 2 | `#2546C4` |
| `glowstone` | `minecraft:glowstone_dust` | 3 | `#C99E35` |

## Tier 5 — Endgame

Mutation with catalyst. 10 pollinations.

| Tree | Output | Count | Color |
|---|---|---|---|
| `diamond` | `minecraft:diamond` | 1 | `#59E5D4` |
| `emerald` | `minecraft:emerald` | 1 | `#30C74D` |
| `obsidian` | `minecraft:obsidian` | 1 | `#5C2D8C` |
| `netherite` | `minecraft:netherite_scrap` | 1 | `#4A3229` |

## Using these names in scripts

Every default tree can be targeted in KubeJS using its `name` as the prefix:

```javascript
// Items
'nostalgictrees:iron_sapling'
'nostalgictrees:iron_log'
'nostalgictrees:stripped_iron_log'
'nostalgictrees:iron_leaves'
'nostalgictrees:iron_apple'
'nostalgictrees:iron_chunk'
'nostalgictrees:iron_honeycomb'

// Recipes
'nostalgictrees:iron_chunk'      // stripped log → chunk
'nostalgictrees:iron_resource'   // chunks + apples + honeycomb → raw iron
'nostalgictrees:iron_mutation'   // (tier 2+) the mutation recipe producing iron saplings
```
