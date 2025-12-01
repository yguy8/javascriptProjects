document.getElementById('favcolor').addEventListener('change', function() {
  var colorValue = this.value;
  document.body.style.backgroundColor = colorValue;
});

    document.getElementById('colorForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const colorValue = document.getElementById('favcolor').value;
      document.body.style.backgroundColor = colorValue;
      generatePalette(colorValue);
    });

    function generatePalette(baseColor) {
      const paletteDiv = document.getElementById('palette');
      paletteDiv.innerHTML = '';

      // Generar variaciones simples (oscurecer/aclarar)
      for (let i = -40; i <= 40; i += 20) {
        const shade = shadeColor(baseColor, i);
        const box = document.createElement('div');
        box.className = 'color-box';
        box.style.backgroundColor = shade;
        paletteDiv.appendChild(box);
      }
    }

    function shadeColor(color, percent) {
      let num = parseInt(color.slice(1),16),
          amt = Math.round(2.55 * percent),
          R = (num >> 16) + amt,
          G = (num >> 8 & 0x00FF) + amt,
          B = (num & 0x0000FF) + amt;
      return "#" + (
        0x1000000 +
        (R<255?R<1?0:R:255)*0x10000 +
        (G<255?G<1?0:G:255)*0x100 +
        (B<255?B<1?0:B:255)
      ).toString(16).slice(1);
    }
