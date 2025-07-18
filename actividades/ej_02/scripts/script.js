function led_toggle(led){
    fetch(`/led/toggle/${led}`);
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(".led-button").forEach(button => {
        button.addEventListener("click", (e) => {
            led_toggle(e.target.dataset.ledId);
        });
    });

    // Actualiza solo el preview cuando se mueve el slider
    document.getElementById('redRange').addEventListener('input', updateRGBPreview);
    document.getElementById('greenRange').addEventListener('input', updateRGBPreview);
    document.getElementById('blueRange').addEventListener('input', updateRGBPreview);

    const applyBtn = document.getElementById('apply-global-rgb');
    if (applyBtn) {
        applyBtn.addEventListener('click', controlRGB);
    }

    updateRGBPreview();
});

function controlRGB() {
    const r = document.getElementById('redRange').value;
    const g = document.getElementById('greenRange').value;
    const b = document.getElementById('blueRange').value;
    fetch(`/rgbled/global/${r}/${g}/${b}`);
}

function updateRGBPreview() {
    const r = document.getElementById('redRange').value;
    const g = document.getElementById('greenRange').value;
    const b = document.getElementById('blueRange').value;
    document.getElementById('redValue').innerText = r;
    document.getElementById('greenValue').innerText = g;
    document.getElementById('blueValue').innerText = b;
    document.getElementById('rgb-global-preview').style.background = `rgb(${r},${g},${b})`;
}
