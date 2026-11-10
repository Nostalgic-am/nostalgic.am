# Shopkeeper

Mira runs a shop. Players trade emeralds for goods, and loyal customers get a surprise.

**What it shows:** a shop menu that loops, prices as greyed-out answers, taking and giving items, and a hidden answer that appears after enough purchases.

## The speaker

`data/mypack/nostalgicdialog/speakers/mira.json`

```json
{
  "name": "Mira",
  "color": "aqua",
  "voice": { "sound": "nostalgicdialog:voice.soft", "pitch": 1.25, "pitch_variance": 0.06 },
  "portraits": {
    "default": "mypack:textures/portrait/mira.png",
    "happy": "mypack:textures/portrait/mira_happy.png"
  }
}
```

## The dialog

`data/mypack/nostalgicdialog/dialogs/shopkeeper.json`

```json
{
  "speaker": "mira",
  "nodes": {
    "start": {
      "next": [
        { "conditions": [ { "type": "flag", "flag": "met_mira" } ], "goto": "welcome_back" },
        { "goto": "first_visit" }
      ]
    },
    "first_visit": {
      "emotion": "happy",
      "lines": "Welcome to Mira's! Fresh bread, sharp tools, fair prices.",
      "actions": [ { "type": "flag", "flag": "met_mira" } ],
      "next": "menu"
    },
    "welcome_back": {
      "emotion": "happy",
      "lines": "Back again, {player}? Have a look around.",
      "next": "menu"
    },
    "menu": {
      "lines": "What'll it be?",
      "choices": [
        {
          "text": "3 bread (1 emerald)",
          "requires": [ { "type": "item", "item": "minecraft:emerald", "count": 1 } ],
          "locked_hint": "(needs 1 emerald)",
          "actions": [
            { "type": "take", "item": "minecraft:emerald", "count": 1 },
            { "type": "give", "item": "minecraft:bread", "count": 3 },
            { "type": "relationship", "npc": "mira", "add": 1 }
          ],
          "goto": "sold"
        },
        {
          "text": "Iron pickaxe (5 emeralds)",
          "requires": [ { "type": "item", "item": "minecraft:emerald", "count": 5 } ],
          "locked_hint": "(needs 5 emeralds)",
          "actions": [
            { "type": "take", "item": "minecraft:emerald", "count": 5 },
            { "type": "give", "item": "minecraft:iron_pickaxe" },
            { "type": "relationship", "npc": "mira", "add": 2 }
          ],
          "goto": "sold"
        },
        {
          "text": "Any deals for regulars?",
          "conditions": [
            { "type": "relationship", "npc": "mira", "min": 10 },
            { "type": "not", "condition": { "type": "flag", "flag": "mira_gift" } }
          ],
          "goto": "regular"
        },
        { "text": "Just looking.", "goto": "bye" }
      ]
    },
    "sold": {
      "emotion": "happy",
      "lines": "{sound:minecraft:entity.experience_orb.pickup}Pleasure doing business!",
      "next": "menu"
    },
    "regular": {
      "emotion": "happy",
      "lines": [
        "For my best customer?{pause:10} I think I can do better than a deal.",
        "Here. On the house."
      ],
      "actions": [
        { "type": "give", "item": "minecraft:golden_apple" },
        { "type": "flag", "flag": "mira_gift" }
      ],
      "next": "menu"
    },
    "bye": {
      "lines": "Come back soon, {player}!",
      "next": "end"
    }
  }
}
```

## How it works

**Prices.** Each item's answer `requires` enough emeralds. Players without them see the answer in grey with the price missing, so they know what to save up for. When picked, the answer's actions take the emeralds and give the goods, then the shop thanks them and goes back to the menu.

**Loyalty.** Every purchase adds relationship points with `mira` (1 for bread, 2 for a pickaxe). At 10 points, "Any deals for regulars?" appears. It's hidden until then, so it's a pleasant surprise. Once the gift is given, the `mira_gift` flag hides it again.

**Shared menu.** The menu is its own node, so adding a product is just another answer in its `choices`.

::: tip More than one shopkeeper
Several characters can share one shop. Give each character a small dialog with their own greeting, then end it with a [`start` action](/logic/actions#start) that jumps into the shared shop dialog.
:::

## Try it

```
/dialog reset @s
/give @s minecraft:emerald 20
/dialog start @s mypack:shopkeeper
```
