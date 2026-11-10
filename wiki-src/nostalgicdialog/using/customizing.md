# Customizing

Make conversations look and sound like your pack. Everything here is done with a resource pack (or `kubejs/assets/` with KubeJS).

## Portraits

Any square image works. See [Speakers & Portraits](/guide/speakers#portraits).

## Voices and menu sounds

Each speaker can use any sound in the game, see [Voice](/guide/speakers#voice). You can also replace the built-in sounds for every speaker at once. Put a `sounds.json` in your resource pack at `assets/nostalgicdialog/sounds.json`:

```json
{
  "voice.default": { "replace": true, "sounds": ["mypack:voices/beep"] },
  "ui.select": { "replace": true, "sounds": ["mypack:ui/confirm"] }
}
```

`mypack:voices/beep` is the file `assets/mypack/sounds/voices/beep.ogg`. Keep voice sounds very short, under a tenth of a second, since one plays every tick while text types.

| Sound | Plays when |
|---|---|
| `voice.default`, `voice.soft`, `voice.low`, `voice.typewriter` | Speakers talk with these voices |
| `ui.move` | The heart moves to another answer |
| `ui.select` | An answer is picked |
| `ui.locked` | The player tries to pick a greyed-out answer |

## Font

Conversations use the font `nostalgicdialog:dialog`, which points to Minecraft's normal font. Replace it for a full pixel-game look by adding `assets/nostalgicdialog/font/dialog.json` to your resource pack.

A TrueType font, saved at `assets/mypack/font/pixel.ttf`:

```json
{
  "providers": [
    { "type": "ttf", "file": "mypack:pixel.ttf", "size": 8, "oversample": 4, "shift": [0, 0] }
  ]
}
```

A bitmap font, drawn as a grid of characters in `assets/mypack/textures/font/pixel.png`:

```json
{
  "providers": [
    {
      "type": "bitmap",
      "file": "mypack:font/pixel.png",
      "ascent": 7,
      "height": 8,
      "chars": [
        " !\"#$%&'()*+,-./",
        "0123456789:;<=>?",
        "@ABCDEFGHIJKLMNO",
        "PQRSTUVWXYZ[\\]^_",
        "`abcdefghijklmno",
        "pqrstuvwxyz{|}~ "
      ]
    }
  ]
}
```

Only the dialog text changes. Names, answers and the rest of the game keep the normal font. Make sure the font has every letter your lines use, since missing ones show as empty boxes.

::: warning Licensing
Fonts from games (such as DELTARUNE or Undertale) belong to their makers and can't be shipped in a public pack. Free pixel fonts with a permissive license are a safe choice.
:::

## Text in other languages

Lines, answers, hints and speaker names can all be language keys instead of text:

```json
"lines": { "translate": "mypack.dialog.elder.greeting" }
```

```json
{ "name": { "translate": "mypack.speaker.elder" } }
```

Then add the text to `assets/mypack/lang/en_us.json`, `assets/mypack/lang/de_de.json` and so on. [Text tags](/guide/text-tags) work inside translated lines.

## Player settings

Players can set their own text speed, punctuation pauses, voice volume, text size and box width. See [Players → Your own settings](/for-players#your-own-settings). To ship different defaults in your pack, include a `config/nostalgicdialog-client.toml`.
