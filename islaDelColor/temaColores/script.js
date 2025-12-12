// --- Función copiar texto ---
function copyText(element) {
    const parent = element.parentElement;
    const textSpan = parent.querySelector(".color-name");
    const originalText = textSpan.innerText;
    navigator.clipboard.writeText(originalText).then(() => {
        textSpan.innerText = "¡Copiado!";
        setTimeout(() => textSpan.innerText = originalText, 1500);
    });
}

// --- Diccionario de paletas por tema conceptual ---
const temasConceptuales = {
    Aventura: [
        ["#1B4D3E", "#FFB400", "#D95F18", "#F2E8C9"],
        ["#2E8B57", "#FFD700", "#8B4513", "#87CEEB"],
        ["#3B5323", "#C19A6B", "#4682B4", "#F4A460"],
        ["#556B2F", "#DAA520", "#CD853F", "#708090"]
    ],
    Diversion: [
        ["#FF69B4", "#FFD700", "#00CED1", "#FF4500"],
        ["#FF1493", "#7FFF00", "#00BFFF", "#FFA500"],
        ["#FF6347", "#40E0D0", "#EE82EE", "#FFFF00"],
        ["#FF00FF", "#00FF7F", "#1E90FF", "#FF8C00"]
    ],
    Calma: [
        ["#A7C7E7", "#B0E0E6", "#E6E6FA", "#F5FFFA"],
        ["#CFE2F3", "#D9EAD3", "#FCE5CD", "#FFF2CC"],
        ["#ADD8E6", "#90EE90", "#FFE4E1", "#F0FFF0"],
        ["#B0C4DE", "#AFEEEE", "#F5DEB3", "#F8F8FF"]
    ],
    Accion: [
        ["#FF0000", "#000000", "#FFD700", "#1C1C1C"],
        ["#DC143C", "#FF8C00", "#00008B", "#2F4F4F"],
        ["#B22222", "#FF4500", "#2E8B57", "#8B0000"],
        ["#FF6347", "#FF0000", "#000000", "#FFA500"]
    ],
    Futurista: [
        ["#0FF0FC", "#FF00FF", "#00FF00", "#000000"],
        ["#8A2BE2", "#00FFFF", "#FF69B4", "#2F4F4F"],
        ["#7FFFD4", "#FF4500", "#9400D3", "#1E90FF"],
        ["#00CED1", "#FF1493", "#FFD700", "#4B0082"]
    ]
};

// --- Generar paleta según tema ---
function generateThemePalette() {
    const tema = document.getElementById("tema").value;

    if (temasConceptuales[tema]) {
        renderMultiplePalettes(temasConceptuales[tema], tema);
    }
}

// --- Renderizar múltiples paletas ---
function renderMultiplePalettes(paletas, tema) {
    const container = document.getElementById("paletteContainer");
    container.innerHTML = "";

    paletas.forEach((colors, index) => {
        const group = document.createElement("div");
        group.className = "palette-group";

        colors.forEach(color => {
            const card = document.createElement("div");
            card.className = "color-card";
            card.style.backgroundColor = color;
            card.innerHTML = `
                <span class="color-name">${color}</span>
                <button onclick="copyText(this)" style="position:absolute;bottom:5px;right:5px;border:none;background:#fdf6e3;cursor:pointer;padding:2px;border-radius:3px;">
                    <svg class="copy-icon" onclick="copyText(this)" 
                    xmlns="http://www.w3.org/2000/svg" width="15" height="15" 
                    viewBox="0 0 24 24" fill="none" stroke="#1e00ff" stroke-width="2" 
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 
                    2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                    <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 
                    -2h10c.75 0 1.158 .385 1.5 1" />
                </svg>
                </button>
            `;
            group.appendChild(card);
        });

        container.appendChild(group);
    });
    
}
