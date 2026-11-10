# Elder Rowan

The village elder. He shows how the pieces fit into the progression loop: the player earns his trust, and he rewards it by unlocking a memory from Nostalgic Memories.

**What it shows:** a different greeting on later visits, a menu the player can return to, greyed-out answers with hints, relationship points, and granting a memory.

## The speaker

`data/mypack/nostalgicdialog/speakers/elder.json`

```json
{
  "name": "Elder Rowan",
  "color": "#E8C170",
  "voice": { "sound": "nostalgicdialog:voice.low", "pitch": 0.9, "pitch_variance": 0.05 },
  "portraits": {
    "default": "mypack:textures/portrait/elder.png",
    "happy": "mypack:textures/portrait/elder_happy.png",
    "sad": "mypack:textures/portrait/elder_sad.png"
  }
}
```

## The dialog

`data/mypack/nostalgicdialog/dialogs/elder.json`

```json
{
  "speaker": "elder",
  "nodes": {
    "start": {
      "next": [
        { "conditions": [ { "type": "flag", "flag": "met_elder" } ], "goto": "welcome_back" },
        { "goto": "first_meeting" }
      ]
    },
    "first_meeting": {
      "emotion": "happy",
      "lines": [
        "Well now... a new face.{pause:10} Hello, {player}.",
        "I'm Rowan. I look after this village, for what it's worth."
      ],
      "actions": [ { "type": "flag", "flag": "met_elder" } ],
      "next": "menu"
    },
    "welcome_back": {
      "emotion": "happy",
      "lines": "Ah, {player}. Back again?",
      "next": "menu"
    },
    "menu": {
      "lines": "What can an old man do for you?",
      "choices": [
        { "text": "Tell me about this place.", "goto": "village" },
        {
          "text": "I brought you some apples.",
          "requires": [ { "type": "item", "item": "minecraft:apple", "count": 3 } ],
          "locked_hint": "(needs 3 apples)",
          "goto": "apples"
        },
        {
          "text": "Teach me to make fire.",
          "conditions": [ { "type": "not", "condition": { "type": "memory", "memory": "mypack:fire" } } ],
          "requires": [ { "type": "relationship", "npc": "elder", "min": 5 } ],
          "locked_hint": "(he doesn't trust you yet)",
          "goto": "fire"
        },
        { "text": "Goodbye.", "goto": "bye" }
      ]
    },
    "village": {
      "lines": "Not much to see now.{emotion:sad} We had a smithy once, before the {color:red}fire{/color}...",
      "next": "menu"
    },
    "apples": {
      "emotion": "happy",
      "lines": "{sound:minecraft:entity.generic.eat}Fresh ones! You're kinder than you look.",
      "actions": [
        { "type": "take", "item": "minecraft:apple", "count": 3 },
        { "type": "relationship", "npc": "elder", "add": 5 }
      ],
      "next": "menu"
    },
    "fire": {
      "lines": [
        "Fire, is it?{pause:15} {speed:0.5}Very well.{speed:1}",
        "Remember this: {shake}respect it{/shake}, or it will take everything from you."
      ],
      "actions": [ { "type": "memory", "memory": "mypack:fire" } ],
      "next": "end"
    },
    "bye": {
      "lines": "Mind the road, {player}.",
      "next": "end"
    }
  }
}
```

## How it works

**First visit or later visit.** `start` has no lines, so it's a [logic node](/guide/dialogs#logic-nodes) that only picks a path. The first visit plays the introduction, which sets the `met_elder` flag. Every later visit gets the short greeting.

**A menu to come back to.** Each topic ends with `"next": "menu"`, so the player can ask about everything before saying goodbye.

**Earning trust.** "Teach me to make fire." is greyed out with *(he doesn't trust you yet)* until the player has 5 relationship points with `elder`. Bringing 3 apples gives exactly 5, and the apples answer is itself greyed out until the player carries 3.

**The reward.** The lesson grants the `mypack:fire` memory, which unlocks whatever that memory locks in Nostalgic Memories. The answer's `conditions` hide it once the memory is known, so it can't be learned twice.

**Text tags.** A pause after "a new face", slow text for "Very well.", the portrait turning sad mid-sentence, a red "fire", an eating sound and shaking words.

## Try it

```
/dialog reset @s
/dialog bind @e[type=villager,limit=1,sort=nearest] mypack:elder
/give @s minecraft:apple 3
```

Without Nostalgic Memories installed, the fire answer still appears once trust is earned, but the memory isn't granted (a warning is logged).
