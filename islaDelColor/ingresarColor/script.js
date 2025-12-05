// función para copiar texto al portapapeles
function copyText(element) {
    const parent = element.parentElement;
    const textSpan = parent.querySelector("span");
    const originalText = textSpan.innerText;
    navigator.clipboard.writeText(originalText).then(() => {
        element.style.stroke = "#06b109"; // verde
        textSpan.innerText = "¡Copiado!";
        setTimeout(() => {
            element.style.stroke = "#1e00ff"; // azul original
            textSpan.innerText = originalText;
        }, 1500);
    }).catch(err => {
        alert("Error al copiar: " + err);
    });
}

// Función para obtener el color complementario
function getComplementaryColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const compR = (255 - r).toString(16).padStart(2, '0');
    const compG = (255 - g).toString(16).padStart(2, '0');
    const compB = (255 - b).toString(16).padStart(2, '0');

    return `#${compR}${compG}${compB}`;
}

// Conversión RGB → HSL
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
            case g: h = ((b - r) / d + 2); break;
            case b: h = ((r - g) / d + 4); break;
        }
        h *= 60;
    }
    return { h: Math.round(h), s: +(s * 100).toFixed(1), l: +(l * 100).toFixed(1) };
}

// Conversión HSL → Hex
function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;

    if (h < 60)      [r, g, b] = [c, x, 0];
    else if (h < 120)[r, g, b] = [x, c, 0];
    else if (h < 180)[r, g, b] = [0, c, x];
    else if (h < 240)[r, g, b] = [0, x, c];
    else if (h < 300)[r, g, b] = [x, 0, c];
    else             [r, g, b] = [c, 0, x];

    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}

// Colores análogos
function getAnalogousColors(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const hsl = rgbToHsl(r, g, b);
    const analog1 = hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l);
    const analog2 = hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);

    return [analog1, analog2];
}

// Colores tetrádicos 
function getTetradicColors(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const hsl = rgbToHsl(r, g, b);
    const tetrad1 = hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l);
    const tetrad2 = hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
    const tetrad3 = hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l);

    return [tetrad1, tetrad2, tetrad3];
}

// Colores triádicos
function getTriadicColors(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const hsl = rgbToHsl(r, g, b);
    const triad1 = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
    const triad2 = hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l);

    return [triad1, triad2];
}


// Sincronizar inputs
document.getElementById('color-picker').addEventListener('input', function() {
    document.getElementById('color-input').value = this.value.toUpperCase();
});
document.getElementById('color-input').addEventListener('input', function() {
    const hex = this.value;
    if(/^#([A-Fa-f0-9]{6})$/.test(hex)) {
        document.getElementById('color-picker').value = hex;
    }
});

// Evento para generar la paleta
document.getElementById('color-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const baseColor = document.getElementById('color-input').value;

    const complementaryColor = getComplementaryColor(baseColor);
    const triadicColors = getTriadicColors(baseColor);
    const analogousColors = getAnalogousColors(baseColor);
    const tetradicColors = getTetradicColors(baseColor);

        // Actualizar los colores en las cajas de la paleta

    const paletteBoxes = document.querySelectorAll('.color-box');
    paletteBoxes[0].style.backgroundColor = baseColor;
    paletteBoxes[1].style.backgroundColor = complementaryColor;
    paletteBoxes[2].style.backgroundColor = triadicColors[0];
    paletteBoxes[3].style.backgroundColor = triadicColors[1];
    paletteBoxes[4].style.backgroundColor = analogousColors[0];
    paletteBoxes[5].style.backgroundColor = tetradicColors[0];

     // Actualizar los nombres de los colores

    document.getElementById('color-name').textContent = baseColor;
    document.getElementById('color-name-two').textContent = complementaryColor;
    document.getElementById('color-name-three').textContent = triadicColors[0];
    document.getElementById('color-name-four').textContent = triadicColors[1];
    document.getElementById('color-name-five').textContent = analogousColors[0];
    document.getElementById('color-name-six').textContent = tetradicColors[0];


     //Cambiar el fondo al color ingresado
    document.body.style.backgroundColor = baseColor;
    document.getElementById('color-code').textContent = baseColor;
});
