# Speakers & Portraits

A speaker is someone who talks. Every dialog can use any speaker, so one character keeps the same name, voice and faces everywhere.

File: `data/<namespace>/nostalgicdialog/speakers/<name>.json`

```json
{
  "name": "Elder Rowan",
  "color": "#E8C170",
  "voice": {
    "sound": "nostalgicdialog:voice.low",
    "pitch": 0.9,
    "pitch_variance": 0.05,
    "volume": 1.0
  },
  "portraits": {
    "default": "mypack:textures/portrait/elder.png",
    "happy": "mypack:textures/portrait/elder_happy.png",
    "sad": "mypack:textures/portrait/elder_sad.png"
  }
}
```

## Fields

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `name` | text | no | — | Shown in the name plate above the box. A plain string, or `{ "translate": "key" }` for a language file entry |
| `color` | string | no | white | Color of the name in the name plate. A hex code like `"#E8C170"` or a color name like `"gold"`, `"aqua"`, `"red"`. The dialog text itself stays white |
| `voice` | object | no | `nostalgicdialog:voice.default` | The talking sound, see below |
| `portraits` | object | no | — | One picture per emotion, see below |
| `portrait` | string | no | — | Shortcut for a speaker with only one picture |

Every field is optional. A speaker file with just `{ "name": "Guard" }` works.

## Voice

The voice is the little sound played while the text types out. It plays once per tick while visible letters are appearing, so spaces stay quiet.

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `sound` | string | no | `nostalgicdialog:voice.default` | Any sound event from a `sounds.json`, from the game, a mod or your resource pack. `"minecraft:none"` makes the speaker silent |
| `pitch` | number | no | `1.0` | Higher sounds younger or smaller, lower sounds older or bigger. Range 0.1 to 4 |
| `pitch_variance` | number | no | `0` | Random change to the pitch for each blip. A little (`0.03` to `0.08`) makes speech sound less robotic. Range 0 to 2 |
| `volume` | number | no | `1.0` | Multiplied by the player's own `voice_volume` setting. Range 0 to 4 |

Built-in voices:

| Sound | Character |
|---|---|
| `nostalgicdialog:voice.default` | Classic square-wave blip |
| `nostalgicdialog:voice.soft` | Gentle, rounded |
| `nostalgicdialog:voice.low` | Deep and buzzy |
| `nostalgicdialog:voice.typewriter` | A tiny click, good for narrators, signs and notes |

Any game sound works too. Try `"minecraft:entity.villager.ambient"` with a short pitch variance for a mumbling villager, or `"minecraft:block.note_block.bit"` for a chiptune voice.

## Portraits

`portraits` maps an emotion name to an image. The names are up to you.

- `default` is shown unless a node or a line asks for another emotion.
- A node picks one with `"emotion": "happy"`.
- A line can switch mid-sentence with <code v-pre>{emotion:sad}</code> (see [Text Tags](/guide/text-tags)).
- If the speaker doesn't have the emotion that was asked for, `default` is shown instead.

Speaker with only one picture? Write `"portrait"` instead of the whole list:

```json
{ "name": "Guard", "portrait": "mypack:textures/portrait/guard.png" }
```

### Making portrait images

- **Square images** of any size: 32×32, 64×64 and 128×128 all work. They're scaled to fit the box, and pixel art stays crisp.
- Non-square images get stretched.
- `mypack:textures/portrait/elder.png` means the file `assets/mypack/textures/portrait/elder.png` in a resource pack, or `kubejs/assets/mypack/textures/portrait/elder.png` with KubeJS.
- A wrong path shows Minecraft's purple-and-black "missing texture" square, which makes typos easy to spot.

::: warning Servers
Speaker files live in the **data** side, but portrait images live in the **resource** side. In a modpack both ship together. On a server that uses only a datapack, players also need the resource pack with the images, for example through the server's resource pack setting.
:::

## The narrator

Nodes without a speaker use the narrator: no name plate, no portrait, the default voice. Use it for descriptions:

```json
"intro": {
  "speaker": "none",
  "lines": "(Someone in a blue hood is sitting by the path.)",
  "next": "greet"
}
```
