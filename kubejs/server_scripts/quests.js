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