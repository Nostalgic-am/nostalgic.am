# Flags & Relationships

Nostalgic Dialog remembers three things about every player. They're saved with the player, kept when they die, and separate for each player on a server.

| What | Looks like | Set by | Checked by |
|---|---|---|---|
| **Flags** | On/off markers: `met_elder`, `quest_wood_done` | [`flag` action](/logic/actions#flag), `/dialog flag` | [`flag` condition](/logic/conditions#flag) |
| **Relationships** | A number per character: `elder = 7` | [`relationship` action](/logic/actions#relationship), `/dialog relationship` | [`relationship` condition](/logic/conditions#relationship) |
| **Seen dialogs** | Which conversations were finished | Finishing a conversation | [`seen` condition](/logic/conditions#seen) |

## Flags

Flags are the simplest memory: something happened, or it didn't. Name them however you like, and keep the names clear, since you'll use them across many files.

Common uses:

- **First meeting:** set `met_elder` in the first greeting, then branch on it at the start
- **Quest steps:** `quest_wood_started`, then `quest_wood_done`
- **One-time rewards:** set `got_map` when the gift is given, and skip the gift node when it's set
- **Choices that matter later:** `sided_with_guard`, then another character reacts to it

::: tip Flags are shared between dialogs
Every dialog sees the same flags. The guard can react to something the player told the elder.
:::

## Relationships

A relationship is a number of points with a character. It starts at 0 and can go up or down. The name (`"npc": "elder"`) is just a word you pick: it doesn't have to match a speaker, and several dialogs can share one.

A simple scale you could use:

| Points | Stage | Example |
|---|---|---|
| below 0 | Disliked | Short, cold answers |
| 0 to 4 | Stranger | Polite small talk |
| 5 to 14 | Friend | Shares stories, offers help |
| 15 or more | Confidant | Teaches secrets, unlocks memories |

Then branch on it:

```json
"start": {
  "next": [
    { "conditions": [ { "type": "relationship", "npc": "elder", "min": 15 } ], "goto": "greet_confidant" },
    { "conditions": [ { "type": "relationship", "npc": "elder", "min": 5 } ], "goto": "greet_friend" },
    { "conditions": [ { "type": "relationship", "npc": "elder", "max": -1 } ], "goto": "greet_cold" },
    { "goto": "greet_stranger" }
  ]
}
```

Points can also come from outside a conversation: an FTB Quests reward or a command block can run `/dialog relationship add <player> elder 3`.

## Seen dialogs

Every finished conversation is remembered. `seen` is handy for "have you heard the whole story yet?", but remember that leaving with Esc doesn't count. For "have we met?", a flag set in the greeting is more reliable.

## Checking and resetting

While building, these [commands](/using/commands) help:

```
/dialog info <player>                            show flags, relationships and seen count
/dialog flag set|clear <players> <flag>
/dialog relationship get <player> <npc>
/dialog relationship add|set <players> <npc> <points>
/dialog reset <players>                          clear everything
/dialog reset <players> flags|relationships|seen clear one kind
```
