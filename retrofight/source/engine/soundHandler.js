export function playSound(sound, volume = 1) {
    setVolume(sound, volume)

    if(!sound.paused && sound.currentTime > 0) {
        sound.currentTime = 0
    } else {
        sound.play()

    }

}

export function stopSound(sound) {
    sound.pause()
    sound.currentTime = 0
}

export function setVolume(sound, volume) {
    sound.volume = volume;
}