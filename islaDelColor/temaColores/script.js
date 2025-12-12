// --- Funciones de conversión y generación de colores ---
function copyText(element) {
    const parent = element.parentElement;
    const textSpan = parent.querySelector(".color-name");
    const originalText = textSpan.innerText;
    navigator.clipboard.writeText(originalText).then(() => {
        textSpan.innerText = "¡Copiado!";
        setTimeout(() => textSpan.innerText = originalText, 1500);
    });
}

function getComplementaryColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const compR = (255 - r).toString(16).padStart(2, '0');
    const compG = (255 - g).toString(16).padStart(2, '0');
    const compB = (255 - b).toString(16).padStart(2, '0');
    return `#${compR}${compG}${compB}`;
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
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

function getAnalogousColors(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const hsl = rgbToHsl(r, g, b);
    const analog1 = hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l);
    const analog2 = hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);
    return [analog1, analog2];
}

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

function getTriadicColors(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const hsl = rgbToHsl(r, g, b);
    const triad1 = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
    const triad2 = hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l);
    return [triad1, triad2];
}

// --- Generar paleta según tema ---
function generateThemePalette() {
    const baseColor = document.getElementById("color-input").value;
    const tema = document.getElementById("tema").value;
    let colors = [];

    if (tema === "Analogo") {
        colors = [baseColor, ...getAnalogousColors(baseColor)];
    } else if (tema === "Complementario") {
        colors = [baseColor, getComplementaryColor(baseColor), ...getTriadicColors(baseColor)];
    } else if (tema === "Tetradico") {
        colors = [baseColor, ...getTetradicColors(baseColor)];
    }else if (tema === "Triadico") {
        colors = [baseColor, ...getTriadicColors(baseColor)];
    }

    renderPalette(colors, tema);
}

// --- Renderizar paleta ---
function renderPalette(colors, tema) {
    const container = document.getElementById("paletteContainer");
    container.innerHTML = "";

    colors.forEach(color => {
        const card = document.createElement("div");
        card.className = "color-card";
        card.style.backgroundColor = color;
        card.innerHTML = `
            <span class="color-name">${color}</span>
            <button class="remove-btn" onclick="this.parentElement.remove()">✖</button>
            <button onclick="copyText(this)" style="position:absolute;bottom:5px;right:5px;border:none;background:#fdf6e3;cursor:pointer;hover:opacity:0.8;padding:2px;border-radius:3px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" 
                        viewBox="0 0 24 24" fill="none" stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 
                        2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 
                        -2h10c.75 0 1.158 .385 1.5 1" /></svg></button>
        `;
        container.appendChild(card);
    });

    
    // Botón copiar toda la paleta
    const copyAllBtn = document.createElement("button");
    copyAllBtn.className = "buscar copy-all"; // ahora usa la variante
    copyAllBtn.textContent = "Copiar paleta completa";
    copyAllBtn.onclick = () => {
        navigator.clipboard.writeText(colors.join(", "));
        copyAllBtn.textContent = "¡Copiada!";
        setTimeout(() => copyAllBtn.textContent = "Copiar paleta completa", 1500);
    };
    container.appendChild(copyAllBtn);
}

// --- Sincronizar inputs ---
document.getElementById("color-picker").addEventListener("input", function() {
    document.getElementById("color-input").value = this.value.toUpperCase();
});
document.getElementById("color-input").addEventListener("input", function() {
    const hex = this.value;
    if(/^#([A-Fa-f0-9]{6})$/.test(hex)) {
        document.getElementById("color-picker").value = hex;
    }
});

