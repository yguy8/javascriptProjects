//función del boton para ir a la sección explorar
function irASeccion() {
    document.getElementById("explorar").scrollIntoView({ behavior: "smooth" });
}

//botón de la guía para mostrar información
const btnGuia = document.getElementById("btnGuia"); const modalGuia = document.getElementById("modalGuia"); const cerrarModal = document.getElementById("cerrarModal"); btnGuia.addEventListener("click", () => { modalGuia.style.display = "block"; }); cerrarModal.addEventListener("click", () => { modalGuia.style.display = "none"; });  window.addEventListener("click", (e) => { if (e.target === modalGuia) { modalGuia.style.display = "none"; } });

//funciones para abrir y cerrar tesoros (modales)
function openModal(id) { document.getElementById(id).style.display = "block"; } function closeModal(id) { document.getElementById(id).style.display = "none"; }

document.addEventListener("DOMContentLoaded", function() {
    const btnInfo = document.getElementById("btnInfoIsla");
    const info = document.getElementById("infoIsla");

    btnInfo.addEventListener("click", function() {
        if (info.style.display === "none" || info.style.display === "") {
            info.style.display = "block";
        } else {
            info.style.display = "none";
        }
    });
});

//joyas del footer que van a caer ´
// Variables claras para configuración
const JEWEL_COUNT = 43;       // cantidad de joyas
const MIN_SIZE = 15;          // tamaño mínimo del diamante
const MAX_SIZE = 20;          // tamaño máximo del diamante
const FALL_SPEED_MIN = 4;     // velocidad mínima de caída
const FALL_SPEED_MAX = 8;     // velocidad máxima de caída
const MARGIN = 400;           // ancho de las esquinas (qué tan pegadas al borde)
let spawned = false;

// Ajusta el canvas al tamaño de la ventana
function fitCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
}

// Dibuja un diamante facetado
function drawDiamond(ctx, x, y, size, color) {
    const half = size / 2;
    const topHeight = size * 0.4;
    const bottomHeight = size * 0.6;

    // Gradiente para simular brillo
    const grad = ctx.createLinearGradient(x - half, y - size, x + half, y + size);
    grad.addColorStop(0, "#fff");
    grad.addColorStop(0.5, color);
    grad.addColorStop(1, "#333");
    ctx.fillStyle = grad;

    // Forma principal del diamante
    ctx.beginPath();
    ctx.moveTo(x - half, y);                // izquierda
    ctx.lineTo(x, y - topHeight);           // arriba
    ctx.lineTo(x + half, y);                // derecha
    ctx.lineTo(x, y + bottomHeight);        // abajo
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#222";
    ctx.stroke();

    // Facetas internas
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 0.8;

    // Línea vertical central
    ctx.beginPath();
    ctx.moveTo(x, y - topHeight);
    ctx.lineTo(x, y + bottomHeight);
    ctx.stroke();

    // Líneas diagonales
    ctx.beginPath();
    ctx.moveTo(x - half, y);
    ctx.lineTo(x, y + bottomHeight);
    ctx.moveTo(x + half, y);
    ctx.lineTo(x, y + bottomHeight);
    ctx.stroke();
}

// Genera colores aleatorios
function randomColor() {
    const colors = ["#73dafaff", "#03da88ff", "#fb2a2aff", "#e8b50eff", "#cd4df8ff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Crear diamantes
function spawnDiamonds(canvas) {
    const ctx = fitCanvas(canvas);
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    const FALL_TARGET = H - 45; // altura final (45px antes del fondo)

    const diamonds = [];
    for (let i = 0; i < JEWEL_COUNT; i++) {
        // Elegir esquina izquierda o derecha
        const side = Math.random() < 0.5 ? "left" : "right";
        let x;
        if (side === "left") {
            x = Math.random() * MARGIN; // esquina izquierda
        } else {
            x = W - MARGIN + Math.random() * MARGIN; // esquina derecha
        }

        diamonds.push({
            x,
            y: -50 - Math.random() * 100,
            size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
            color: randomColor(),
            vy: FALL_SPEED_MIN + Math.random() * (FALL_SPEED_MAX - FALL_SPEED_MIN),
            done: false
        });
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        diamonds.forEach(d => {
            if (!d.done) {
                d.y += d.vy;
                if (d.y >= FALL_TARGET) {
                    d.y = FALL_TARGET;
                    d.done = true;
                }
            }
            drawDiamond(ctx, d.x, d.y, d.size, d.color);
        });
        if (diamonds.some(d => !d.done)) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// Scroll: aparecen al ver el footer
(function setupScroll() {
    const canvas = document.getElementById("treasureCanvas");
    window.addEventListener("resize", () => fitCanvas(canvas));
    fitCanvas(canvas);

    window.addEventListener("scroll", () => {
        const footer = document.querySelector("footer");
        const rect = footer.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom >= 0;

        if (inView && !spawned) {
            spawned = true;
            spawnDiamonds(canvas);
        } else if (!inView && spawned) {
            spawned = false;
            const ctx = fitCanvas(canvas);
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        }
    });
})();
