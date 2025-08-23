// función que genera un color hexadecimal aleatorio
function getRandomColor() {
    const hexChars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Event listener para los botones
document.getElementById('color-btn').addEventListener('mouseover', function () {
    this.style.backgroundColor = getRandomColor(); // Cambia el color del botón al pasar el mouse
});
document.getElementById('color-btn').addEventListener('mouseout', function () {
    this.style.backgroundColor = ''; // Restaura el color original del botón al quitar el mouse
});

document.getElementById('color-btn').addEventListener('click', function () {
    const newColor = getRandomColor();
    document.body.style.backgroundColor = newColor; // Cambia el color de fondo
    document.getElementById('color-code').textContent = newColor; // el nombre del color de fondo
    document.getElementById('color-code').style.color = newColor; // Cambia el color del texto al color de fondo
    //document.getElementById('color-container').style.backgroundColor = newColor; // Cambia el color del borde de la tarjeta
});
