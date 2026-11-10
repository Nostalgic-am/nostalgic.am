# Players

What to expect when an NPC talks to you.

## How a conversation works

A box opens at the bottom of the screen. The speaker's name sits on top of it, their portrait on the left, and their words type out one letter at a time with a little talking sound.

When a line finishes, a small arrow blinks in the corner. Press a key to continue. When the character asks you something, a list of answers appears above the box with a red heart next to the one you're pointing at.

The game keeps running while you talk. Nothing pauses, so pick a safe spot to chat.

## Controls

| Key | What it does |
|---|---|
| **Z**, **Enter**, **Space** or **left click** | Continue to the next box, or pick the answer the heart is on |
| **X** or **Shift** | Show the rest of the line straight away |
| **Arrow keys**, **W / S** or **mouse wheel** | Move between answers |
| **Mouse** | Point at an answer and click it |
| **Esc** | Leave the conversation (some conversations don't allow this) |

## Greyed-out answers

Some answers show up in grey with a note after them, such as *I brought you some apples. (needs 3 apples)*. You can't pick those yet. The note tells you what's missing, so you can come back later.

Other answers stay hidden entirely until you've done something, so it's worth talking to characters again.

## NPCs remember you

Characters can remember what you said and did: whether you've met, whether you helped them, how much they like you. Their greetings and answers change over time. If you leave a conversation early with **Esc**, it doesn't count as finished, so you can usually pick up where you left off.

## Talking to an NPC

Right-click a character that has something to say. They turn to face you while you talk. If you walk more than 8 blocks away, the conversation ends.

## Your own settings

Open `config/nostalgicdialog-client.toml` to change how conversations feel on your screen. Changes apply the next time a conversation opens.

| Setting | Default | What it changes |
|---|---|---|
| `text_speed` | `1.5` | Letters typed per tick (20 ticks = 1 second). Higher is faster. Range 0.1 to 20 |
| `sentence_pause` | `6` | Short wait after `.` `!` `?`, in ticks. `0` turns it off |
| `comma_pause` | `3` | Short wait after `,` `;` `:`, in ticks |
| `voice_volume` | `1.0` | Volume of the talking sounds. `0` mutes them. Range 0 to 2 |
| `confirm_reveals` | `true` | If `true`, the continue key also finishes a line that's still typing. If `false`, only X / Shift does |
| `text_scale` | `1.0` | Text size. Range 0.5 to 3 |
| `box_width` | `360` | Widest the box can get, in GUI pixels. It shrinks on small windows |
