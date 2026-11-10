# Packmakers

How to add your own characters and conversations.

## Two kinds of files

| File | What it is | Where it goes |
|---|---|---|
| **Speaker** | Someone who talks: name, voice, portraits | `data/<namespace>/nostalgicdialog/speakers/<name>.json` |
| **Dialog** | One conversation: what is said, the choices, what happens | `data/<namespace>/nostalgicdialog/dialogs/<name>.json` |

`<namespace>` is a short lowercase name for your pack, like `mypack`. A file at `data/mypack/nostalgicdialog/dialogs/elder.json` gets the id `mypack:elder`.

These are normal datapack files, so they work anywhere a datapack does:

- **A datapack:** `<world>/datapacks/<your pack>/data/mypack/nostalgicdialog/...`
- **KubeJS:** `kubejs/data/mypack/nostalgicdialog/...` (the namespace folder goes straight inside `kubejs/data`)
- **A mod:** `src/main/resources/data/mypack/nostalgicdialog/...`

Portraits are images, so they go in a resource pack (or `kubejs/assets/`). See [Speakers & Portraits](/guide/speakers).

## Your first dialog in five minutes

**1. Make a speaker.** Save this as `kubejs/data/mypack/nostalgicdialog/speakers/guard.json`:

```json
{
  "name": "Guard",
  "color": "gold",
  "voice": { "sound": "nostalgicdialog:voice.low", "pitch": 0.9 }
}
```

**2. Make a dialog.** Save this as `kubejs/data/mypack/nostalgicdialog/dialogs/guard.json`:

```json
{
  "speaker": "guard",
  "nodes": {
    "start": {
      "lines": "Halt! Who goes there?",
      "choices": [
        { "text": "Just a traveler.", "goto": "traveler" },
        { "text": "None of your business.", "goto": "rude" }
      ]
    },
    "traveler": {
      "lines": "Very well. Keep out of trouble, {player}.",
      "next": "end"
    },
    "rude": {
      "lines": "{shake}Watch your tone.{/shake}",
      "next": "end"
    }
  }
}
```

**3. Load it.** Run `/reload` in game. The log prints how many speakers and dialogs loaded, and any mistakes in your files.

**4. Try it.** Run `/dialog start @s mypack:guard`.

**5. Put it on an NPC.** Look at any mob and run:

```
/dialog bind @e[type=villager,limit=1,sort=nearest] mypack:guard
```

Now right-clicking that villager opens the conversation.

::: tip
The `"speaker": "guard"` line means "the speaker called `guard` in the same namespace as this dialog". Use `"other:guard"` to borrow a speaker from another namespace.
:::

## Pages to read next

- [Dialogs & Nodes](/guide/dialogs) — how a conversation is put together
- [Choices](/guide/choices) — hidden and greyed-out answers
- [Conditions](/logic/conditions) and [Actions](/logic/actions) — make characters react and reward the player
- [Starting Dialogs](/using/starting) — NPCs, quests, command blocks
- [Examples](/examples/elder) — complete dialogs to copy
