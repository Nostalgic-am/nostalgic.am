# Dialogs & Nodes

A dialog is one conversation. It's made of **nodes**: each node is one step, such as a few lines from a character, a question with answers, or an invisible decision.

File: `data/<namespace>/nostalgicdialog/dialogs/<name>.json`

```json
{
  "speaker": "wanderer",
  "start": "start",
  "closable": true,
  "on_end": [ { "type": "flag", "flag": "talked_to_wanderer" } ],
  "nodes": {
    "start": {
      "lines": [
        "Oh! Hello, {player}.",
        "Travelers don't stop here often."
      ],
      "next": "ask"
    },
    "ask": {
      "emotion": "thinking",
      "lines": "What brings you out here?",
      "choices": [
        { "text": "Just exploring.", "goto": "exploring" },
        { "text": "Never mind.", "goto": "end" }
      ]
    },
    "exploring": {
      "emotion": "happy",
      "lines": "Then you'll love it here.",
      "next": "end"
    }
  }
}
```

## Dialog fields

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `nodes` | object | yes | — | All the steps, by name. Names are up to you |
| `start` | string | no | `"start"` | The node the conversation begins at |
| `speaker` | string | no | narrator | Who talks in nodes that don't name a speaker. `"elder"` means the speaker `elder` in the same namespace, `"other:elder"` works too, `"none"` is the narrator |
| `closable` | boolean | no | `true` | Whether **Esc** can close the conversation early. With `false`, the box reopens until the player finishes |
| `on_end` | list | no | — | [Actions](/logic/actions) run when the conversation reaches its end |

## Node fields

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `lines` | text or list | no | — | What is said. One text, or a list where each entry is its own box |
| `speaker` | string | no | — | Who says it, overriding the dialog's `speaker` |
| `emotion` | string | no | — | Which portrait to show, a key from the speaker's `portraits` |
| `choices` | list | no | — | Answers the player can pick, see [Choices](/guide/choices) |
| `actions` | list | no | — | [Actions](/logic/actions) run as soon as the node starts |
| `next` | string or list | no | — | Where to go after the last line when there are no choices |

### Lines

Each line is one box. A line too long for one box keeps going in the next box on its own, three rows at a time, without breaking words.

A line is a plain string, or a language key for translated packs:

```json
"lines": [
  "This is a plain line.",
  { "translate": "mypack.dialog.elder.greeting" }
]
```

Lines can use [text tags](/guide/text-tags) for pauses, colors, sounds and effects, also inside translated lines.

### Where to go next

`next` is one of these:

- **A node name:** `"next": "menu"`
- **`"end"`:** the conversation finishes
- **A list of branches**, checked from top to bottom. The first one whose [conditions](/logic/conditions) all pass is used. A branch without conditions always passes, so put it last as the fallback:

```json
"next": [
  { "conditions": [ { "type": "relationship", "npc": "elder", "min": 10 } ], "goto": "friendly" },
  { "conditions": [ { "type": "flag", "flag": "met_elder" } ], "goto": "neutral" },
  { "goto": "first_meeting" }
]
```

A node without `next`, or where no branch matches, ends the conversation.

## Logic nodes

A node with no `lines` and no visible choices is a **logic node**. The player never sees it: it runs its actions and moves straight on to `next`. Use logic nodes to make decisions.

The most common one is a start node that picks a greeting:

```json
"start": {
  "next": [
    { "conditions": [ { "type": "flag", "flag": "met_wanderer" } ], "goto": "welcome_back" },
    { "goto": "first_meeting" }
  ]
}
```

Another is giving a reward only once:

```json
"maybe_gift": {
  "next": [
    { "conditions": [ { "type": "flag", "flag": "got_map" } ], "goto": "bye" },
    { "goto": "gift" }
  ]
}
```

::: warning Loops
Logic nodes that point at each other forever would freeze the game, so the mod stops after 64 logic nodes in a row, ends the conversation and logs an error. Make sure every chain of logic nodes reaches a node with lines, or `end`.
:::

## When a conversation counts as finished

A conversation is **finished** when it reaches `end`, or a node with nowhere to go. Then:

1. The `on_end` actions run.
2. The player is marked as having **seen** this dialog, which the [`seen` condition](/logic/conditions#seen) can check later.

Closing early with **Esc** does **not** count as finishing: no `on_end`, not marked as seen. That's why the [examples](/examples/elder) remember a first meeting with a flag set in a node, rather than with `seen`.

## The speaker per node

Different nodes can have different speakers, so two characters can talk to each other:

```json
"nodes": {
  "start": { "speaker": "guard", "lines": "Who's this?", "next": "reply" },
  "reply": { "speaker": "elder", "lines": "A friend. Let them through.", "next": "end" }
}
```
