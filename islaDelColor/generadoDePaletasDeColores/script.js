// función para copiar texto al portapapeles
    function copyText(element) {
    // 'element' es el ícono SVG.
    const parent = element.parentElement;  // Buscamos el contenedor padre (el <p>)
    const textSpan = parent.querySelector("span"); // Buscamos el span que contiene el texto DENTRO de ese padre
    const originalText = textSpan.innerText; //Obtenemos el texto original
    navigator.clipboard.writeText(originalText).then(() => {  // Copiamos al portapapeles
        
        // Cambiamos el color del ícono (element es el SVG)
        element.style.stroke = "#06b109"; // verde

        // Cambiamos el texto del span
        textSpan.innerText = "¡Copiado!";

        // Restauramos todo después de 1.5 segundos
        setTimeout(() => {
            element.style.stroke = "#1e00ff"; // vuelve al azul original
            textSpan.innerText = originalText; // restaura el código hex original
        }, 1500);
        
    }).catch(err => {
        alert("Error al copiar: " + err);
    });
}
        // función que genera un color hexadecimal aleatorio
        function getRandomColor() {
            const hexChars = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
            color += hexChars[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Evento para cambiar el color de fondo y mostrar el código
        document.getElementById('color-btn').addEventListener('click', function () {
            const newColor = getRandomColor();
            document.body.style.backgroundColor = newColor; // Cambia el color de fondo
            document.getElementById('color-code').textContent = newColor; // el nombre del color de fondo
        });

        // Función para obtener el color complementario
        function getComplementaryColor(hex) {
            // Convertir el color hexadecimal a RGB
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);

            // Calcular el color complementario
            const compR = (255 - r).toString(16).padStart(2, '0');
            const compG = (255 - g).toString(16).padStart(2, '0');
            const compB = (255 - b).toString(16).padStart(2, '0');

            return `#${compR}${compG}${compB}`;
        }
        // Funciones para convertir entre RGB y HSL
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // gris
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

        //Función para convertir HSL a Hexadecimal
        function hslToHex(h, s, l) {
            s /= 100;
            l /= 100;

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

        // Función para obtener los colores triádicos
        function getTriadicColors(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);

            const hsl = rgbToHsl(r, g, b);
            const triad1 = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
            const triad2 = hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l);

            return [triad1, triad2];
        }

        // Evento para generar la paleta de colores
        document.getElementById('color-btn').addEventListener('click', function () {
            const baseColor = getRandomColor();
            const complementaryColor = getComplementaryColor(baseColor);
            const triadicColors = getTriadicColors(baseColor);

            const paletteBoxes = document.querySelectorAll('.color-box');
            paletteBoxes[0].style.backgroundColor = baseColor;
            paletteBoxes[1].style.backgroundColor = complementaryColor;
            paletteBoxes[2].style.backgroundColor = triadicColors[0];
            paletteBoxes[3].style.backgroundColor = triadicColors[1];
            document.getElementById('color-name').textContent = baseColor; 
            document.getElementById('color-name-two').textContent = complementaryColor;
            document.getElementById('color-name-three').textContent = triadicColors[0];
            document.getElementById('color-name-four').textContent = triadicColors[1];

        });