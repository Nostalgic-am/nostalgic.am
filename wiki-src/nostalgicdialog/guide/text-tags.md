# Text Tags

Tags inside a line change how it types out: pauses, speed, colors, sounds, effects and portrait changes. They work in every line, including translated ones.

```json
"lines": "Fire?{pause:15} {speed:0.5}Very well.{speed:1} {shake}Respect it.{/shake}"
```

## All tags

| Tag | Effect |
|---|---|
| <code v-pre>{player}</code> | The player's name |
| <code v-pre>{pause:20}</code> | Wait 20 ticks (1 second) before typing on |
| <code v-pre>{speed:0.5}</code> | Type at half speed from here. <code v-pre>{speed:2}</code> is twice as fast, <code v-pre>{speed:1}</code> is normal again |
| <code v-pre>{emotion:sad}</code> | Switch the portrait to `sad` at this point |
| <code v-pre>{sound:minecraft:block.bell.use}</code> | Play a sound at this point |
| <code v-pre>{sound:minecraft:block.bell.use:1.5}</code> | Play a sound with a pitch |
| <code v-pre>{color:gold}</code> … <code v-pre>{/color}</code> | Color the text between. A color name or a hex code like <code v-pre>{color:#ff8800}</code> |
| <code v-pre>{shake}</code> … <code v-pre>{/shake}</code> | Trembling letters |
| <code v-pre>{wave}</code> … <code v-pre>{/wave}</code> | Wavy letters |
| <code v-pre>{{</code> | A plain `{` |
| `\n` | Start a new row |

## Details

**Pauses and speed.** `{pause}` and `{speed}` change timing only. Typing also pauses briefly on its own after `.` `!` `?` and `,` `;` `:` when more text follows. Players can change those pauses in their [settings](/for-players#your-own-settings).

::: tip Reset the speed
A `{speed:x}` tag stays in effect until another speed tag changes it, even into the next box. Close every slow or fast part with <code v-pre>{speed:1}</code>.
:::

**Emotions.** `{emotion:x}` switches the portrait when the typing reaches it, and the new face stays for the rest of the node. A node's `"emotion"` field sets the face it starts with.

**Sounds.** Any sound event works: the game's, a mod's or one from your resource pack. Sound ids have a colon in them, so a pitch is a third part: <code v-pre>{sound:minecraft:entity.generic.eat:1.2}</code>.

**Colors.** Color names are Minecraft's: `black`, `dark_blue`, `dark_green`, `dark_aqua`, `dark_red`, `dark_purple`, `gold`, `gray`, `dark_gray`, `blue`, `green`, `aqua`, `red`, `light_purple`, `yellow`, `white`. Colors can be nested.

**Skipping.** When the player skips ahead with X or Shift, pauses are skipped and sounds that haven't played yet stay silent. Emotion changes still apply, so the face is always right.

**Typos.** A tag the mod doesn't know is shown as written, such as `{shkae}`, so mistakes are easy to spot in game.

## Line breaks

Lines wrap on their own, so you rarely need `\n`. Use it when you want a row to end at an exact spot:

```json
"lines": "A riddle for you:\nWhat has roots nobody sees?"
```

Each entry in `lines` is already its own box, so to start a fresh box, start a new entry instead.
