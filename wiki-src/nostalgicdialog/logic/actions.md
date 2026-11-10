# Actions

Actions make things happen. They're used in three places:

| Where | When it runs |
|---|---|
| A node's `actions` | As soon as the node starts, before its lines appear |
| A choice's `actions` | When the player picks that answer |
| The dialog's `on_end` | When the conversation [finishes](/guide/dialogs#when-a-conversation-counts-as-finished) |

Each is written as an object with a `type`. A list runs from top to bottom.

```json
"actions": [
  { "type": "take", "item": "minecraft:apple", "count": 3 },
  { "type": "relationship", "npc": "elder", "add": 5 },
  { "type": "flag", "flag": "gave_apples" }
]
```

## give

Gives the player items. Whatever doesn't fit in the inventory drops at their feet.

```json
{ "type": "give", "item": "minecraft:map", "count": 1 }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `item` | string | yes | — | An item id. Tags can't be given, since there's no single item to pick |
| `count` | integer | no | `1` | How many, up to 6400 |

Need an item with custom data, such as a named sword? Use a [`command`](#command) action with `/give`.

## take

Removes items from the player.

```json
{ "type": "take", "item": "#minecraft:logs", "count": 16 }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `item` | string | yes | — | An item id, or a tag with `#` |
| `count` | integer | no | `1` | How many |

`take` removes as many as it can find. If the player has fewer, it takes what's there. Put an [`item` condition](/logic/conditions#item) in the choice's `requires` so the answer can only be picked when the player has enough.

## flag

Sets or clears a flag. See [Flags & Relationships](/logic/flags-relationships).

```json
{ "type": "flag", "flag": "met_elder" }
{ "type": "flag", "flag": "quest_started", "value": false }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `flag` | string | yes | — | The flag's name |
| `value` | boolean | no | `true` | `true` sets it, `false` clears it |

## relationship

Changes relationship points with a character.

```json
{ "type": "relationship", "npc": "elder", "add": 5 }
{ "type": "relationship", "npc": "elder", "add": -2 }
{ "type": "relationship", "npc": "elder", "set": 0 }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `npc` | string | yes | — | The relationship's name |
| `add` | integer | no | — | Points to add. Negative numbers take points away |
| `set` | integer | no | — | Set the points to this number. If `add` is also given, it's added after |

## memory

Grants a memory from Nostalgic Memories, or takes it away. If that mod isn't installed, nothing happens and a warning is logged.

```json
{ "type": "memory", "memory": "mypack:fire" }
{ "type": "memory", "memory": "mypack:fire", "silent": true }
{ "type": "memory", "memory": "mypack:fire", "revoke": true }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `memory` | string | yes | — | The memory's id |
| `silent` | boolean | no | `false` | Grant without the memory's announcement, title and sound |
| `revoke` | boolean | no | `false` | Take the memory away instead |

## command

Runs a command as the player, with permission level 2, without printing its output in chat. `@s` is the player.

```json
{ "type": "command", "command": "give @s minecraft:diamond_sword[minecraft:custom_name='\"Elder Blade\"']" }
{ "type": "command", "command": "effect give @s minecraft:regeneration 10 1" }
{ "type": "command", "command": "playsound minecraft:ui.toast.challenge_complete master @s" }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `command` | string | yes | — | The command, without `/` |

Anything a command can do, a dialog can do: teleport, summon, scoreboards, other mods' commands.

## start

Leaves this conversation and starts another one straight away.

```json
{ "type": "start", "dialog": "mypack:elder_story", "node": "chapter_two" }
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `dialog` | string | yes | — | The dialog to start |
| `node` | string | no | — | The node to begin at (optional, defaults to that dialog's `start`) |

The conversation that was left doesn't count as finished. Use it to split a long story over several files, or to jump into a shared dialog, such as a shop menu several characters use.

## Order matters

Actions in a list run in order, and a node's actions run before its lines. So a node that gives a reward and then thanks the player works as you'd expect:

```json
"gift": {
  "actions": [ { "type": "give", "item": "minecraft:map" } ],
  "lines": "Here, take this. It might help on the road.",
  "next": "end"
}
```
