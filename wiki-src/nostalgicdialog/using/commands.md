# Commands

Every command starts with `/dialog` and needs permission level 2 (operators, command blocks, functions, and quest or NPC mods running with raised permissions). Dialog ids tab-complete.

## Conversations

| Command | What it does |
|---|---|
| `/dialog start <players> <dialog> [node]` | Starts a conversation, at `node` if given |
| `/dialog stop <players>` | Closes the conversation without finishing it |
| `/dialog bind <entities> <dialog> [node]` | Right-clicking these entities starts the dialog. See [Starting Dialogs](/using/starting#talk-to-a-mob-or-npc) |
| `/dialog unbind <entities>` | Removes the binding |
| `/dialog list` | Lists every loaded dialog and how many speakers are loaded |

## Player data

| Command | What it does |
|---|---|
| `/dialog flag set <players> <flag>` | Sets a flag |
| `/dialog flag clear <players> <flag>` | Clears a flag |
| `/dialog flag has <player> <flag>` | Shows `true` or `false`, and returns 1 or 0 |
| `/dialog relationship add <players> <npc> <points>` | Adds points (negative to take away) |
| `/dialog relationship set <players> <npc> <points>` | Sets points |
| `/dialog relationship get <player> <npc>` | Shows the points, and returns them |
| `/dialog reset <players>` | Clears all flags, relationships and seen dialogs |
| `/dialog reset <players> flags` | Clears flags only (also `relationships` or `seen`) |
| `/dialog info <player>` | Shows a player's flags, relationships and how many dialogs they've finished |

## Using results in command blocks

`flag has` and `relationship get` return a number, so other commands can use them with `execute store`:

```
execute store result score @p elder_trust run dialog relationship get @p elder
execute if score @p elder_trust matches 10.. run say The elder trusts you!
```

```
execute store result score @p met run dialog flag has @p met_elder
```

## Common recipes

| Goal | Command |
|---|---|
| Test a dialog from the start | `/dialog reset @s` then `/dialog start @s mypack:elder` |
| Jump to a node while writing | `/dialog start @s mypack:elder menu` |
| Pretend a quest step is done | `/dialog flag set @s quest_wood_done` |
| See what a player has done | `/dialog info Steve` |
| Reload after editing files | `/reload` |
