const brightnessControls = document.getElementById("brightnessControls");
const brightnessSlider = document.getElementById("brightnessSlider");
const brightnessText = document.getElementById("brightnessText");
const dark_mode_button = document.getElementById("dark_mode_button");

let isDraggingBrightness = false;
let offsetXBrightness, offsetYBrightness;

brightnessText.addEventListener("mousedown", (e) => {
    isDraggingBrightness = true;
    offsetXBrightness = e.clientX - brightnessControls.getBoundingClientRect().left;
    offsetYBrightness = e.clientY - brightnessControls.getBoundingClientRect().top;
    brightnessControls.style.cursor = "grabbing";
    brightnessControls.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
    if (!isDraggingBrightness) return;

    const newX = e.clientX - offsetXBrightness;
    const newY = e.clientY - offsetYBrightness;

    brightnessControls.style.left = `${newX}px`;
    brightnessControls.style.top = `${newY}px`;
});

document.addEventListener("mouseup", () => {
    isDraggingBrightness = false;
    brightnessControls.style.cursor = "pointer";
    brightnessControls.style.userSelect = "auto";
});

brightnessSlider.addEventListener("input", function () {
    const brightnessValue = this.value;
    document.body.style.filter = `brightness(${brightnessValue}%)`;
});
/*document.addEventListener("DOMContentLoaded", () => {
    const initialBrightness = 50; // Set your desired initial brightness value here

    // Set the initial value of the slider
    brightnessSlider.value = initialBrightness;

    // Apply the initial brightness value to the page
    document.body.style.filter = `brightness(${initialBrightness}%)`;})*/

    dark_mode_button.addEventListener("click", () =>{
        document.body.classList.toggle("dark_mode")
    })