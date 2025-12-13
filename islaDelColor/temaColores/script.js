// Generar colores aleatorios hex
function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

// Valida si un valor es un color CSS válido
function isValidCssColor(value) {
 
}

// Normaliza el color ingresado (soporta español, hex, rgb/hsl)
function normalizeUserColor(value) {
    let v = value.trim().toLowerCase();

    const map = {
        "negro": "#000000",
        "blanco": "#ffffff",
        "rojo": "red",
        "azul": "blue",
        "verde": "green",
        "amarillo": "yellow",
        "naranja": "orange",
        "morado": "purple",
        "violeta": "violet",
        "rosa": "pink",
        "gris": "gray",
        "cian": "cyan",
        "magenta": "magenta",
        "marron": "brown",
        "marrón": "brown",
        "cafe": "brown",
        "café": "brown",
        "turquesa": "turquoise",
        "dorado": "gold",
        "plata": "silver"
    };

    if (map[v]) return map[v];

    if (/^#?[0-9a-f]{3}$/.test(v) || /^#?[0-9a-f]{6}$/.test(v)) {
        if (!v.startsWith("#")) v = "#" + v;
        return v;
    }

    if (isValidCssColor(v)) return v;

    return null;
    }

    // Mostrar toast
    function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
    }

    // Copiar color individual
    function copyText(element) {
    const parent = element.parentElement;
    const textSpan = parent.querySelector(".color-name");
    const originalText = textSpan.innerText;
    navigator.clipboard.writeText(originalText).then(() => {
        textSpan.innerText = "¡Copiado!";
        setTimeout(() => (textSpan.innerText = originalText), 1500);
    });
    }

    // Copiar toda la paleta
    function copyPalette(button) {
    const group = button.closest(".palette-group");
    const colors = [...group.querySelectorAll(".color-name")].map((span) => span.innerText);
    const paletteText = colors.join(", ");
    navigator.clipboard.writeText(paletteText).then(() => {
        button.innerText = "¡Paleta copiada!";
        setTimeout(() => (button.innerText = "Copiar paleta"), 1500);
    });
    }

    // Eliminar paleta
    function deletePalette(button) {
    const group = button.closest(".palette-group");
    group.remove();
    }

    // Lista de colores añadidos por el usuario
    let userColors = [];

    // Generar paletas
    function generateThemePalette() {
    const tema = document.getElementById("tema").value.trim();
    const container = document.getElementById("paletteContainer");

    if (!tema) {
        showToast("⚠ Por favor ingresa un tema para comenzar");
        return;
    }

    container.innerHTML = "";

    for (let i = 0; i < 4; i++) {
        const group = document.createElement("div");
        group.className = "palette-group";

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "✖";
        deleteBtn.className = "remove-btn";
        deleteBtn.onclick = () => deletePalette(deleteBtn);
        group.appendChild(deleteBtn);

        const paletteColors = [...userColors];
        while (paletteColors.length < 4) {
        const rand = randomColor();
        paletteColors.push({ raw: rand, normalized: rand });
        }

        paletteColors.forEach((colorObj) => {
        const card = document.createElement("div");
        card.className = "color-card";
        card.style.backgroundColor = colorObj.normalized;
        card.innerHTML = `
            <span class="color-name">${colorObj.raw}</span>
            <button onclick="copyText(this)" class="copy-color-btn">
            <svg class="copy-icon" onclick="copyText(this)" 
            xmlns="http://www.w3.org/2000/svg" width="15" height="15" 
            viewBox="0 0 24 24" fill="none" stroke="#1e00ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 
            2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 
            -2h10c.75 0 1.158 .385 1.5 1" /></svg> 
            </button>
        `;
        group.appendChild(card);
        });

        const copyBtn = document.createElement("button");
        copyBtn.innerText = "Copiar paleta";
        copyBtn.className = "copy-btn";
        copyBtn.onclick = () => copyPalette(copyBtn);
        group.appendChild(copyBtn);

        container.appendChild(group);
    }
    }

    // Añadir color específico
    function addSpec() {
    const input = document.getElementById("specInput");
    const raw = input.value.trim();
    if (!raw) return;

    const normalized = normalizeUserColor(raw);
    if (!normalized) {
        showToast("⚠ Color no válido. Usa nombres (negro, azul), hex (#000000), rgb(0,0,0) o hsl(0,0%,0%).");
        return;
    }

    userColors.push({ raw: raw, normalized: normalized });

    const specList = document.getElementById("specList");
    const specBtn = document.createElement("div");
    specBtn.className = "spec-btn";

    const swatch = document.createElement("span");
    swatch.className = "spec-swatch";
    swatch.style.backgroundColor = normalized;

    const label = document.createElement("span");
    label.innerText = raw;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "✖";
    removeBtn.className = "remove-spec";
    removeBtn.onclick = () => {
        userColors = userColors.filter((c) => c.raw !== raw);
        specBtn.remove();
    };

    specBtn.appendChild(swatch);
    specBtn.appendChild(label);
    specBtn.appendChild(removeBtn);
    specList.appendChild(specBtn);

    input.value = "";
    }
