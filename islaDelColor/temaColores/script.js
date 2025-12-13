// Generar colores aleatorios hex
function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
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

// Generar paletas según tema
function generateThemePalette() {
    const tema = document.getElementById("tema").value || "Tema";
    const container = document.getElementById("paletteContainer");
    container.innerHTML = "";

    for (let i = 0; i < 4; i++) {
    const group = document.createElement("div");
    group.className = "palette-group";

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✖";
    deleteBtn.className = "remove-btn";
    deleteBtn.onclick = () => deletePalette(deleteBtn);
    group.appendChild(deleteBtn);

    // Colores
    for (let j = 0; j < 4; j++) {
        const color = randomColor();
        const card = document.createElement("div");
        card.className = "color-card";
        card.style.backgroundColor = color;
        card.innerHTML = `
            <span class="color-name">${color}</span>
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
        }

        // Botón copiar paleta
        const copyBtn = document.createElement("button");
        copyBtn.innerText = "Copiar paleta";
        copyBtn.className = "copy-btn";
        copyBtn.onclick = () => copyPalette(copyBtn);
        group.appendChild(copyBtn);

        container.appendChild(group);
    }
}

// Añadir especificación
function addSpec() {
    const input = document.getElementById("specInput");
    const value = input.value.trim();
    if (!value) return;

    const specList = document.getElementById("specList");
    const specBtn = document.createElement("div");
    specBtn.className = "spec-btn";

    const span = document.createElement("span");
    span.innerText = value;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "✖";
    removeBtn.className = "remove-spec";
    removeBtn.onclick = () => specBtn.remove();

    specBtn.appendChild(span);
    specBtn.appendChild(removeBtn);
    specList.appendChild(specBtn);

    input.value = "";
}
