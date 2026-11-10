---
title: Nostalgic Dialog Wiki
---

# Nostalgic Dialog

<img src="/banner.gif" alt="A Nostalgic Dialog conversation: the Wanderer says hello and offers two choices" width="800">

Classic RPG-style conversations for Minecraft. Text types out letter by letter with a talking blip, characters have portraits that change with their mood, and players answer with choices that shape what happens next.

Everything is written in JSON files in a datapack or KubeJS. No coding needed.

## Getting Started

[Players](/for-players) for what a conversation looks like and how to control it.

[Packmakers](/for-packmakers) for where the files go, and your first dialog in five minutes.

Want to see it first? Run this in game:

```
/dialog start @s nostalgicdialog:demo
```

## What you can build

- **Branching conversations** with as many paths as you like, and menus players can come back to
- **Choices that are hidden** until the player has earned them, or **shown greyed out** with a hint such as *(needs 3 apples)*
- **NPCs that remember**: flags, relationship points and past conversations change what they say next time
- **Things that happen** when you talk: give or take items, run commands, raise relationship points, unlock memories from Nostalgic Memories
- **A look of your own**: portraits for every mood, a voice per character, text effects, and your own font and sounds

## Requirements

- Minecraft 1.21.1 with NeoForge
- Optional: [Nostalgic Memories](/logic/conditions#memory) for memory conditions and actions, KubeJS for keeping files in `kubejs/data`, FTB Quests or Easy NPC to start dialogs from quests and NPCs
