function toggleIslandMenu(btn) {
            // Usamos 'this' (btn) para encontrar el icono y la lista adyacente
            const icon = btn.querySelector('.material-symbols-outlined');
            const menu = document.getElementById('menuLista');

            // 1. Verificamos el estado
            const isOpen = menu.classList.contains('open');

            if (isOpen) {
                // --- CERRAR MENÚ: Ancla abajo ---
                menu.classList.remove('open');
                btn.classList.remove('active');
                icon.innerText = 'anchor'; 
                
            } else {
                // --- ABRIR MENÚ: Bandera izada ---
                menu.classList.add('open');
                btn.classList.add('active');
                icon.innerText = 'flag';
            }
        }