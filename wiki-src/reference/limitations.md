# Known Limitations

Things that aren't currently scriptable or have known quirks. If you hit one of these, you're not doing it wrong — it's a mod-level limitation.

## Mallet log stripping is not a recipe

The "use mallet on log → drop stripped log + consume mallet durability" interaction is implemented as a Java event handler, not a recipe. It has no recipe type, no ID, and no JSON representation.

You cannot:

- Disable it from KubeJS
- Replace it with a different interaction
- Change which tool is required to break logs
- Modify the output or durability cost

You **can** add bonus drops via `BlockEvents.broken` listeners — but the base interaction always fires first.

```javascript
// This adds bonus drops on top — it doesn't replace the stripped log drop
BlockEvents.broken('#nostalgictrees:resource_logs', event => {
    const held = event.player.mainHandItem
    if (!held.id.endsWith('_mallet')) return
    event.block.popItemFromFace(Item.of('minecraft:stick'), 'up')
})
```

If you have a compelling use case for configuring this, open an issue on the [GitHub repo](https://github.com/Nostalgic-am/nostalgictrees/issues) — it's a core mechanic and stays Java-side unless there's a clear need.

## Mutation recipes don't report output

The `event.remove({ output: ... })` filter doesn't work on mutation recipes. Internally, mutation recipes return `ItemStack.EMPTY` from the standard "what does this recipe produce" method, so KubeJS's output-matching logic can't find them.

```javascript
// This does NOT work — matches zero recipes
event.remove({ output: 'nostalgictrees:diamond_sapling', type: 'nostalgictrees:mutation' })

// Use id: or type: instead
event.remove({ id: 'nostalgictrees:diamond_mutation' })
event.remove({ type: 'nostalgictrees:mutation' })
```

Drying recipes don't have this issue — they report output correctly.

## Bee pollination timing is fixed

How often bees visit saplings, how many bees participate, and how pollinations accumulate are all governed by Java logic tied to the Advanced Beehive block entity. KubeJS can't change any of it.

You **can** change the number of pollinations required for a specific mutation via its `pollinations_required` field. That's the only pollination-related value exposed to scripts.

## Advanced Beehive UI is fixed

The hive's slot layout, inventory size (5 bees + 9 output slots + bottle/shears slots), and UI rendering are all hardcoded. No way to change slot count or layout via scripting.

## Custom recipe schemas are fixed

The `nostalgictrees:mutation` and `nostalgictrees:drying` recipe types have specific fields you can set. You can't add new fields, require different data, or validate recipe inputs differently via KubeJS. The schemas are defined in Java.

If your pack needs a field that doesn't exist (e.g., "only trigger this mutation at night"), that's a mod-level feature request rather than a scripting task.

## Tree config requires restart

Editing a file in `config/nostalgictrees/trees/` takes effect on the next world load — not on `/reload`. The mod generates resources from tree configs during startup, and that process doesn't re-run mid-session.

This also means:

- Adding a new tree → full game restart
- Renaming a tree → full game restart (and old items in player inventories become invalid)
- Removing a tree → full game restart (existing items become invalid)

Recipe scripts in KubeJS do work with `/reload` — this limitation is specific to tree configs.

## Mallet durability is not scriptable

The durability values and efficiency multipliers in the `MalletTier` enum aren't exposed to scripts. Making a mallet more/less durable requires a Java change or a resource pack with a JSON overrides (for the durability specifically, which has limitations).

## Reporting new limitations

If you hit something that isn't listed here and isn't in [Targeting Recipes](/reference/targeting), file an issue — it's either a genuine bug, undocumented behavior, or something worth adding to this page.
