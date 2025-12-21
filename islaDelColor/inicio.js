//función del boton para ir a la sección explorar
function irASeccion() {
    document.getElementById("explorar").scrollIntoView({ behavior: "smooth" });
}

//botón de la guía para mostrar información
const btnGuia = document.getElementById("btnGuia"); const modalGuia = document.getElementById("modalGuia"); const cerrarModal = document.getElementById("cerrarModal"); btnGuia.addEventListener("click", () => { modalGuia.style.display = "block"; }); cerrarModal.addEventListener("click", () => { modalGuia.style.display = "none"; });  window.addEventListener("click", (e) => { if (e.target === modalGuia) { modalGuia.style.display = "none"; } });

//funciones para abrir y cerrar tesoros (modales)
function openModal(id) { document.getElementById(id).style.display = "block"; } function closeModal(id) { document.getElementById(id).style.display = "none"; }