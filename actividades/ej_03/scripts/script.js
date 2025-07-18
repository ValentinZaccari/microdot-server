function led_toggle(led){
    fetch(`/led/toggle/${led}`);
}

document.addEventListener('DOMContentLoaded', function () {
    
    document.querySelectorAll(".led-button").forEach(button => {
        button.addEventListener("click", (e) => {
            led_toggle(e.target.dataset.ledId);
        });
    });


    document.getElementById('redRange').addEventListener('input', updateRGBPreview);
    document.getElementById('greenRange').addEventListener('input', updateRGBPreview);
    document.getElementById('blueRange').addEventListener('input', updateRGBPreview);

    const applyBtn = document.getElementById('apply-global-rgb');
    if (applyBtn) {
        applyBtn.addEventListener('click', controlRGB);
    }

    updateRGBPreview();

   
    const setpointRange = document.getElementById('setpointRange');
    const setpointValue = document.getElementById('setpointValue');
    if(setpointRange && setpointValue) {
        setpointRange.addEventListener('input', function() {
            setpointValue.textContent = setpointRange.value;
        });

        setpointRange.addEventListener('change', function() {
            fetch(`/setpoint/${setpointRange.value}`, { method: 'POST' });
        });
    }

    
    function refreshTempAndBuzzer() {
        fetch('/sensor/temperature')
            .then(res => res.json())
            .then(data => {
                const tempEl = document.getElementById('sensorTemp');
                if(tempEl) tempEl.textContent = data.temperature?.toFixed(1) ?? '--';
            });

        fetch('/buzzer/status')
            .then(res => res.json())
            .then(data => {
                const buzzEl = document.getElementById('buzzerStatus');
                if(buzzEl) buzzEl.textContent = data.status === 'on' ? 'Encendido' : 'Apagado';
            });
    }

    setInterval(refreshTempAndBuzzer, 2000);
    refreshTempAndBuzzer();
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
