ExposureEvents.frameAdded(event => {
    if (event.frame.getBoolean("minecraft:pig")
        || event.frame.getBoolean("minecraft:sheep")
        || event.frame.getBoolean("minecraft:cow")
        || event.frame.getBoolean("minecraft:chicken")) {
        Utils.server.runCommandSilent(`heracles complete farm ${event.player.username}`)
    }

    if (event.frame.getBoolean("Selfie")) {
        Utils.server.runCommandSilent(`heracles complete selfie ${event.player.username}`)
    }
})

ExposureEvents.modifyFrameData(event => {
    event.getFrame().putFloat("Pitch", event.player.pitch)
    event.getFrame().putFloat("Yaw", event.player.yaw)
})

ItemEvents.entityInteracted(event => {
    if (event.item.id == "minecraft:ender_pearl"
        && event.target.entityType == "entity.exposure.photograph_frame") {
        let tag = event.target.nbt.Item.tag
        event.player.teleportTo(tag.Dimension, tag.Pos[0], tag.Pos[1], tag.Pos[2], tag.Yaw, tag.Pitch)
        event.item.shrink(1)
        event.cancel()
    }
})