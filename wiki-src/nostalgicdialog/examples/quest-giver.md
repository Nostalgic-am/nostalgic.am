# Quest Giver

Captain Bram needs logs to fix the palisade. The conversation changes as the quest moves on.

**What it shows:** a quest in three stages tracked with flags, a turn-in that needs items from a tag, and a reward.

## The speaker

`data/mypack/nostalgicdialog/speakers/bram.json`

```json
{
  "name": "Captain Bram",
  "color": "#C0504D",
  "voice": { "sound": "nostalgicdialog:voice.default", "pitch": 0.8, "pitch_variance": 0.04 },
  "portraits": {
    "default": "mypack:textures/portrait/bram.png",
    "happy": "mypack:textures/portrait/bram_happy.png"
  }
}
```

## The dialog

`data/mypack/nostalgicdialog/dialogs/quest_giver.json`

```json
{
  "speaker": "bram",
  "nodes": {
    "start": {
      "next": [
        { "conditions": [ { "type": "flag", "flag": "quest_wood_done" } ], "goto": "done" },
        { "conditions": [ { "type": "flag", "flag": "quest_wood_started" } ], "goto": "check" },
        { "goto": "offer" }
      ]
    },
    "offer": {
      "lines": [
        "That storm tore half the palisade down.",
        "Bring me {color:gold}16 logs{/color} and I'll make it worth your while."
      ],
      "choices": [
        {
          "text": "I'll do it.",
          "actions": [ { "type": "flag", "flag": "quest_wood_started" } ],
          "goto": "accepted"
        },
        { "text": "Not right now.", "goto": "not_now" }
      ]
    },
    "accepted": {
      "emotion": "happy",
      "lines": "Good. Any kind of log will do.",
      "next": "end"
    },
    "not_now": {
      "lines": "Suit yourself. The offer stands.",
      "next": "end"
    },
    "check": {
      "lines": "Got those logs, {player}?",
      "choices": [
        {
          "text": "Here you go.",
          "requires": [ { "type": "item", "item": "#minecraft:logs", "count": 16 } ],
          "locked_hint": "(needs 16 logs)",
          "actions": [
            { "type": "take", "item": "#minecraft:logs", "count": 16 },
            { "type": "give", "item": "minecraft:emerald", "count": 5 },
            { "type": "relationship", "npc": "bram", "add": 3 },
            { "type": "flag", "flag": "quest_wood_started", "value": false },
            { "type": "flag", "flag": "quest_wood_done" }
          ],
          "goto": "reward"
        },
        { "text": "Still working on it.", "goto": "keep_going" }
      ]
    },
    "reward": {
      "emotion": "happy",
      "lines": "{sound:minecraft:entity.villager.yes}Fine work! Here's your pay.",
      "next": "end"
    },
    "keep_going": {
      "lines": "Don't take too long. Winter's coming.",
      "next": "end"
    },
    "done": {
      "emotion": "happy",
      "lines": "The palisade's never looked better. Thanks again, {player}.",
      "next": "end"
    }
  }
}
```

## How it works

**Three stages.** The `start` node checks the flags in order:

| Flags | Stage | Bram says |
|---|---|---|
| `quest_wood_done` | Finished | Thanks again |
| `quest_wood_started` | In progress | Got those logs? |
| neither | Not started | Offers the quest |

The order matters: "done" is checked first, so a finished quest never shows the earlier stages.

**Any kind of log.** `#minecraft:logs` is a tag, so oak, birch, spruce and logs from other mods all count, mixed together.

**Turning in.** "Here you go." is greyed out with *(needs 16 logs)* until the player has them. Picking it takes the logs, pays 5 emeralds, adds relationship points, clears `quest_wood_started` and sets `quest_wood_done`.

**Not now.** Declining or leaving with Esc changes nothing, so the offer is there next time.

::: tip With FTB Quests
If you'd rather track this quest in the FTB quest book, give the FTB quest a command reward of `/dialog flag set {p} quest_wood_done`. When the player finishes it there, Bram thanks them the next time they talk.
:::

## Try it

```
/dialog reset @s
/dialog start @s mypack:quest_giver
/give @s minecraft:oak_log 16
/dialog start @s mypack:quest_giver
```
