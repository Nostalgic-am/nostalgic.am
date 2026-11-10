# Choices

Choices are the answers the player can pick. They appear above the box once the node's last line has finished typing, with a red heart next to the one the player is pointing at.

```json
"ask": {
  "lines": "What brings you all the way out here?",
  "choices": [
    { "text": "Just exploring.", "goto": "exploring" },
    { "text": "I'm looking for something.", "goto": "looking" },
    { "text": "Never mind.", "goto": "end" }
  ]
}
```

## Fields

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `text` | text | yes | — | What the answer says. A plain string or `{ "translate": "key" }` |
| `goto` | string | no | — | The node to go to. Without it, the node's `next` is used (or the conversation ends) |
| `actions` | list | no | — | [Actions](/logic/actions) run when the answer is picked |
| `conditions` | list | no | — | If any fails, the answer is **hidden** |
| `requires` | list | no | — | If any fails, the answer is **shown greyed out** and can't be picked |
| `locked_hint` | text | no | — | A note shown after a greyed-out answer, such as `"(needs bread)"` |

## Hidden or greyed out?

Both use [conditions](/logic/conditions). The difference is what the player sees.

| | `conditions` fails | `requires` fails |
|---|---|---|
| The player sees the answer | No | Yes, in grey |
| The player can pick it | No | No, it plays a short buzz |
| Use it for | Secrets, answers that no longer make sense | Goals: show what's possible and what's missing |

They work well together. This answer disappears once the wanderer has been fed, but while it's available it shows what the player needs:

```json
{
  "text": "I brought you bread.",
  "conditions": [ { "type": "not", "condition": { "type": "flag", "flag": "fed_wanderer" } } ],
  "requires": [ { "type": "item", "item": "minecraft:bread" } ],
  "locked_hint": "(needs bread)",
  "actions": [
    { "type": "take", "item": "minecraft:bread" },
    { "type": "flag", "flag": "fed_wanderer" }
  ],
  "goto": "thanks"
}
```

| The player... | Sees |
|---|---|
| has no bread, hasn't fed them | **I brought you bread.** (needs bread), in grey |
| has bread, hasn't fed them | **I brought you bread.**, ready to pick |
| has already fed them | nothing |

## Things the mod takes care of

- **Checked again when picked.** Conditions are checked when the answers appear and again when one is picked. If the player dropped the bread while the box was open, the question is simply shown again.
- **Players never get stuck.** If every visible answer is greyed out, none are shown and the node continues with its `next`, as if it had no choices.
- **The server decides.** Hidden answers are never sent to the player's game, so they can't be seen or picked by a modified client.

## Tips

- **Keep answers short:** about 40 characters, and 4 or 5 answers per question. Answers don't wrap onto a second row, so very long ones or very long lists can run off small screens.
- **Give the player a way out.** A "Never mind." or "Goodbye." answer is friendly, especially when [`closable`](/guide/dialogs#dialog-fields) is `false`.
- **Make menus.** Point topics back at the question node (`"next": "menu"`) so players can ask about everything before leaving. See [Elder Rowan](/examples/elder).
- <code v-pre>{player}</code> works in answer text. Effect tags such as <code v-pre>{color}</code> or <code v-pre>{shake}</code> are left out of answers.
