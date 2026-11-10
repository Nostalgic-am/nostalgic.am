# Troubleshooting

Nostalgic Dialog checks your files when they load and writes what it finds to the game log (`logs/latest.log`). Most problems are explained there.

## Reading the log

After starting a world or running `/reload`, look for lines from `nostalgicdialog`. A healthy load looks like this:

```
[com.nostalgicdialog.NostalgicDialog/]: Loaded 3 speakers
[com.nostalgicdialog.NostalgicDialog/]: Loaded 5 dialogs
```

If the numbers are lower than the files you made, one of them didn't load. The reason is a few lines above.

## Messages and what to do

### When files load

| Message | Meaning | Fix |
|---|---|---|
| `Couldn't load dialog mypack:elder: ...` | The file has a mistake, so it was skipped. The end of the message says what | Check the field it names. Common causes: a missing comma, a typo in a field name, `"type"` misspelled |
| `Couldn't load speaker mypack:elder: ...` | Same, for a speaker file | As above |
| `Unknown condition type 'flags'. Known: [...]` | A condition's `type` doesn't exist | Use one of the listed types. See [Conditions](/logic/conditions) |
| `Unknown action type 'giv'. Known: [...]` | An action's `type` doesn't exist | See [Actions](/logic/actions) |
| `Dialog mypack:elder: start node 'start' doesn't exist` | There's no node with the `start` name | Add a node called `start`, or set `"start"` to your first node's name |
| `Dialog mypack:elder: node 'menu' goes to 'vilage', which doesn't exist` | A `goto` or `next` has a typo | Fix the node name. `end` is always allowed |
| `Dialog mypack:elder: node 'menu' uses speaker mypack:eldr, which doesn't exist (narrator is used instead)` | The speaker name is wrong, or the speaker file failed to load | Fix the name, or check the speaker's own load message |

### During a conversation

| Message | Meaning | Fix |
|---|---|---|
| `Can't start dialog mypack:elder for Steve: it doesn't exist` | The id in the command or binding is wrong, or the file failed to load | Check the id with `/dialog list` |
| `Dialog mypack:elder has no node 'x'; ending it` | The conversation tried to go to a node that isn't there | Fix the `goto` (it's also reported at load time) |
| `Dialog mypack:elder went through 64 nodes without showing anything (a loop?); ending it` | [Logic nodes](/guide/dialogs#logic-nodes) point at each other in a circle | Make sure every chain reaches a node with lines, or `end` |
| `Dialog 'give' needs an item id, not #c:gems` | A `give` action uses a tag | Give a specific item id |
| `Dialog command 'xyz' failed` | A `command` action threw an error | Test the command in chat, without the `/` in the JSON |
| `Dialog tried to grant memory mypack:fire, but Nostalgic Memories isn't installed` | A `memory` action ran without that mod | Install Nostalgic Memories, or remove the action |

## Common questions

**My changes don't show up.**
Run `/reload` after editing dialog and speaker files. Portrait images and sounds are part of the resource pack, so those need **F3 + T** (reload resource packs) instead.

**The portrait is a purple and black square.**
The image path is wrong. `mypack:textures/portrait/elder.png` must be at `assets/mypack/textures/portrait/elder.png` in a resource pack. See [Portraits](/guide/speakers#making-portrait-images).

**A choice never shows up.**
Its `conditions` don't pass. Check the player's data with `/dialog info <player>`. If the answer should show but be unpickable, use `requires` instead. See [Choices](/guide/choices#hidden-or-greyed-out).

**The conversation skips my question.**
If every visible answer is greyed out, the mod skips the question so the player can't get stuck. Make sure at least one answer, such as "Never mind.", has no `requires`.

**The text stays slow (or fast).**
A <code v-pre>{speed:x}</code> tag lasts until another one changes it, even into the next box. End slow parts with <code v-pre>{speed:1}</code>.

**Right-clicking the NPC opens trades instead of talking.**
The binding is missing. Bind it again with `/dialog bind`, and check the selector picked the right entity.

**The conversation ends by itself.**
A conversation with a bound character ends when the player is more than 8 blocks away, the character dies, or one of them changes dimension. To teleport during a conversation, see [Teleporting during a conversation](/using/starting#teleporting-during-a-conversation).

**A tag shows up as text, like `{shkae}`.**
The mod didn't recognize it, so it's shown as written. Check the spelling against [Text Tags](/guide/text-tags).

**Players on my server don't see portraits.**
Portraits live in the resource pack. Players need it too, see the [note on servers](/guide/speakers#making-portrait-images).
