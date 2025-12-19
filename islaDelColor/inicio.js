//función del boton para ir a la sección explorar
function irASeccion() {
    document.getElementById("explorar").scrollIntoView({ behavior: "smooth" });
}

//botón de la brújula para mostrar información
const btnBrujula = document.getElementById("btnBrujula"); const modalBrujula = document.getElementById("modalBrujula"); const cerrarModal = document.getElementById("cerrarModal"); btnBrujula.addEventListener("click", () => { modalBrujula.style.display = "block"; }); cerrarModal.addEventListener("click", () => { modalBrujula.style.display = "none"; });  window.addEventListener("click", (e) => { if (e.target === modalBrujula) { modalBrujula.style.display = "none"; } });

//funciones para abrir y cerrar tesoros (modales)
function openModal(id) { document.getElementById(id).style.display = "block"; } function closeModal(id) { document.getElementById(id).style.display = "none"; }