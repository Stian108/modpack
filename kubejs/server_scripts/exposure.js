const QUEST = Java.loadClass("earth.terrarium.heracles.common.handlers.progress.QuestProgressHandler")
const DUMMY = Java.loadClass("earth.terrarium.heracles.api.tasks.defaults.DummyTask")

function completeDummy(event, id) {
    QUEST.getProgress(event.server, event.player.getUuid())
        .testAndProgressTaskType(event.player, id, DUMMY.TYPE)
}

ExposureEvents.frameAdded(event => {
    if (event.frame.getBoolean("minecraft:pig")) completeDummy(event, "pig")
    if (event.frame.getBoolean("minecraft:sheep")) completeDummy(event, "sheep")
    if (event.frame.getBoolean("minecraft:cow")) completeDummy(event, "cow")
    if (event.frame.getBoolean("minecraft:chicken")) completeDummy(event, "chicken")
    if (event.frame.getBoolean("Selfie")) completeDummy(event, "selfie")
})

ExposureEvents.modifyFrameData(event => {
    event.getFrame().putFloat("Pitch", event.player.pitch)
    event.getFrame().putFloat("Yaw", event.player.yaw)
})

ItemEvents.entityInteracted(event => {
    if (event.item.id == "minecraft:ender_pearl"
        && event.target.entityType == "entity.exposure.photograph_frame"
        && event.target.nbt.contains("Item")
        && event.target.nbt.Item.contains("tag")) {
        let tag = event.target.nbt.Item.tag
        if (tag.contains("Dimension") && tag.contains("Pos")) {
            if (tag.contains("Yaw") && tag.contains("Pitch"))
                event.player.teleportTo(tag.Dimension, tag.Pos[0], tag.Pos[1], tag.Pos[2], tag.Yaw, tag.Pitch)
            else
                event.player.teleportTo(tag.Dimension, tag.Pos[0], tag.Pos[1], tag.Pos[2], event.player.yaw, event.player.pitch)
            event.item.shrink(1)
            completeDummy(event, "teleport")
            event.cancel()
        }
    }
})