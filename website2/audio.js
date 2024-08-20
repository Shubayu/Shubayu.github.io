const audioPlayers = document.querySelectorAll(".audio-player")

audioPlayers.forEach((audioPlayer, index) => {
    const toggleButton = document.querySelectorAll(".toggle-button")[index];
    const toggleText = document.querySelectorAll(".toggle-text")[index];
    const volumeControl = document.querySelectorAll(".volume-control")[index];
    const audioControls = document.querySelectorAll(".audio-controls")[index]

toggleText.addEventListener("click", function () {
    audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause()
    toggleButton.classList.toggle("play")
    toggleButton.classList.toggle("pause")
    audioPlayer.volume = parseFloat(volumeControl.value);
})

volumeControl.addEventListener("mousedown", function (e) {
    e.stopPropagation()
});

toggleButton.removeEventListener("click", function () {})

volumeControl.addEventListener("input", function() {
    audioPlayer.volume = parseFloat(volumeControl.value)
})

audioPlayer.addEventListener("play", function() {
    toggleButton.classList.replace("play", "pause")
})

audioPlayer.addEventListener("pause", function () {
    toggleButton.classList.replace("pause", "play")
})

let isDragging = false;
let offsetX, offsetY;

audioControls.addEventListener("mousedown", (e) => {
    isDragging = true
    const rect = audioControls.getBoundingClientRect()
    offsetX = e.clientX - rect.left
    offsetY = e.clientY - rect.top
    audioControls.style.cursor = "grabbing"
    audioControls.style.userSelect = "none"
})

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return

    audioControls.style.left = `${e.clientX - offsetX}px`;
    audioControls.style.top = `${e.clientY - offsetY}px`;
})

document.addEventListener("mouseup", () => {
    isDragging = false;
    audioControls.style.cursor = "pointer"
    audioControls.style.userSelect = "auto"
})
})