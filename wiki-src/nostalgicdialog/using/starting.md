# Starting Dialogs

A conversation can start from a character the player right-clicks, a command, a quest, a command block, or anything else that runs commands.

## Talk to a mob or NPC

Bind a dialog to any entity, and right-clicking it starts the conversation:

```
/dialog bind <entities> <dialog> [node]
```

```
/dialog bind @e[type=villager,limit=1,sort=nearest] mypack:elder
```

- Works on any entity except players: villagers, mobs, armor stands, Easy NPC characters.
- The binding is saved with the entity, so it survives restarts.
- Right-clicking replaces the entity's normal interaction. A bound villager talks instead of opening its trades.
- While talking, a mob turns to face the player and stops walking.
- The conversation ends if the player walks more than **8 blocks** away, the character dies, or one of them changes dimension.
- Add a node name to start somewhere other than the dialog's `start`: `/dialog bind @e[...] mypack:elder menu`.

Remove a binding with:

```
/dialog unbind <entities>
```

::: tip Name your NPCs
Give characters a name tag or a tag first, so the selector finds the right one later: `/dialog bind @e[tag=elder,limit=1] mypack:elder`.
:::

## With a command

```
/dialog start <players> <dialog> [node]
```

```
/dialog start @p mypack:welcome
/dialog start Steve mypack:elder menu
```

The conversation opens a moment later, at the end of the current game tick. A player can only be in one conversation at a time: starting another replaces the open one.

## From FTB Quests

Add a **command reward** to a quest:

```
/dialog start {p} mypack:elder
```

`{p}` is the player who completed the quest. `/dialog` needs permission level 2, so if the reward runs with the player's own permissions, turn on the reward's option to run with raised permissions.

Rewards can also change the conversation itself: `/dialog flag set {p} quest_wood_done` or `/dialog relationship add {p} elder 3`.

## From Easy NPC

Give the NPC an action that runs a command when it's clicked, such as:

```
/dialog start @p mypack:elder
```

Or bind the dialog straight onto the Easy NPC with `/dialog bind`, as with any other entity.

## From command blocks and pressure plates

A command block with `/dialog start @p mypack:sign` next to a pressure plate makes a talking sign. Use the narrator (`"speaker": "none"`) and the `voice.typewriter` sound for a nice "reading a note" feel.

## From Nostalgic Memories

A memory's unlock commands can start a dialog, so a character can react the moment the player unlocks something. Going the other way, dialogs can check and grant memories with the [`memory` condition](/logic/conditions#memory) and [`memory` action](/logic/actions#memory).

## Teleporting during a conversation

A conversation started with a **command** keeps going wherever the player goes, also into another dimension. Use a [`command` action](/logic/actions#command) to teleport and keep talking.

A conversation started by **right-clicking a bound character** ends when the player gets more than 8 blocks from that character, and a teleport counts. To teleport and keep talking, end the character's conversation with a logic node that teleports the player and starts a new dialog with a command. The new one isn't tied to the character:

```json
"to_the_ruins": {
  "actions": [
    { "type": "command", "command": "execute in mypack:story run tp @s 0 64 0" },
    { "type": "command", "command": "dialog start @s mypack:ruins_arrival" }
  ]
}
```

## Ending a conversation

```
/dialog stop <players>
```

This closes the box without counting the conversation as finished: no `on_end`, not marked as seen. The same happens when the player dies or logs out.
