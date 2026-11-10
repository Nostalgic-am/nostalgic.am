# Conditions

Conditions check something about the player. They're used in three places:

| Where | What happens when a condition fails |
|---|---|
| A choice's `conditions` | The answer is hidden |
| A choice's `requires` | The answer is greyed out |
| A branch in `next` | That branch is skipped and the next one is tried |

Each is written as an object with a `type`. When a list has several, **all** of them must pass.

```json
"conditions": [
  { "type": "flag", "flag": "met_elder" },
  { "type": "item", "item": "minecraft:emerald", "count": 5 }
]
```

All conditions are checked on the server, for the player in the conversation.

## flag

Passes when the player has the flag. Flags are on/off markers you set with the [`flag` action](/logic/actions#flag) or the [`/dialog flag`](/using/commands) command.

```json
{ "type": "flag", "flag": "met_elder" }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `flag` | string | yes | — | The flag's name, any word you like |

## seen

Passes when the player has **finished** that dialog before. Leaving early with Esc doesn't count, see [when a conversation counts as finished](/guide/dialogs#when-a-conversation-counts-as-finished).

```json
{ "type": "seen", "dialog": "mypack:elder_intro" }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `dialog` | string | yes | — | The dialog's id |

## relationship

Passes when the player's relationship points with that character are in a range. See [Flags & Relationships](/logic/flags-relationships).

```json
{ "type": "relationship", "npc": "elder", "min": 5 }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `npc` | string | yes | — | The relationship's name. Any word, it doesn't have to match a speaker |
| `min` | integer | no | — | Lowest allowed points (optional) |
| `max` | integer | no | — | Highest allowed points (optional) |

`"min": 5` means 5 or more. `"min": 0, "max": 9` means 0 to 9. A player who has never earned points has 0.

## item

Passes when the player carries at least that many of an item, anywhere in their inventory.

```json
{ "type": "item", "item": "minecraft:apple", "count": 3 }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `item` | string | yes | — | An item id, or a tag with `#` such as `"#minecraft:logs"` or `"#c:gems"` |
| `count` | integer | no | `1` | How many are needed |

## memory

Passes when the player has a memory from Nostalgic Memories, our progression mod. Always fails if that mod isn't installed.

```json
{ "type": "memory", "memory": "mypack:fire" }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `memory` | string | yes | — | The memory's id |

## command

Runs a command and passes when it succeeds with a result above 0. This is the escape hatch for anything the other conditions can't check: levels, scores, advancements, positions, other mods' commands.

```json
{ "type": "command", "command": "execute if entity @s[level=10..]" }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `command` | string | yes | — | The command, without `/`. It runs as the player, so `@s` is the player |

More ideas:

| Checks | Command |
|---|---|
| Level 10 or more | `execute if entity @s[level=10..]` |
| A scoreboard score of 3 or more | `execute if score @s quests matches 3..` |
| An advancement | `execute if entity @s[advancements={minecraft:story/mine_diamond=true}]` |
| Standing in the Nether | `execute if dimension minecraft:the_nether` |
| Night time | `execute if predicate mypack:is_night` (with your own predicate) |

## not

Passes when the condition inside fails.

```json
{ "type": "not", "condition": { "type": "flag", "flag": "fed_wanderer" } }
```

## any

Passes when at least one condition inside passes.

```json
{
  "type": "any",
  "conditions": [
    { "type": "item", "item": "minecraft:bread" },
    { "type": "item", "item": "minecraft:apple" }
  ]
}
```

## all

Passes when every condition inside passes. A normal list already works this way, so `all` is only needed inside `any` or `not`:

```json
{
  "type": "not",
  "condition": {
    "type": "all",
    "conditions": [
      { "type": "flag", "flag": "quest_started" },
      { "type": "flag", "flag": "quest_done" }
    ]
  }
}
```
