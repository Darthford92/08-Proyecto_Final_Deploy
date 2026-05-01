document.addEventListener('DOMContentLoaded', () => {
    const pasosLista = document.querySelector('ol');
    if (pasosLista) {
        pasosLista.querySelectorAll('li').forEach(paso => {
            paso.addEventListener('click', () => {
                if (paso.classList.contains('tachado')) {
                    paso.classList.remove('tachado');
                } else {
                    paso.classList.add('tachado');
                }
            });
        });
    }

    const ingredientesDiv = document.querySelector('ul')?.closest('div');
    const pasosDiv = document.querySelector('ol')?.closest('div');

    if (ingredientesDiv) {
        const btnIngredientes = document.createElement('button');
        btnIngredientes.textContent = 'Ocultar Ingredientes';
        btnIngredientes.classList.add('btn-toggle');
        ingredientesDiv.parentNode.insertBefore(btnIngredientes, ingredientesDiv);
        btnIngredientes.addEventListener('click', () => {
            if (ingredientesDiv.style.display === 'none') {
                ingredientesDiv.style.display = 'block';
                btnIngredientes.textContent = 'Ocultar Ingredientes';
            } else {
                ingredientesDiv.style.display = 'none';
                btnIngredientes.textContent = 'Mostrar Ingredientes';
            }
        });
    }

    if (pasosDiv) {
        const btnPasos = document.createElement('button');
        btnPasos.textContent = 'Ocultar Pasos';
        btnPasos.classList.add('btn-toggle');
        pasosDiv.parentNode.insertBefore(btnPasos, pasosDiv);
        btnPasos.addEventListener('click', () => {
            if (pasosDiv.style.display === 'none') {
                pasosDiv.style.display = 'block';
                btnPasos.textContent = 'Ocultar Pasos';
            } else {
                pasosDiv.style.display = 'none';
                btnPasos.textContent = 'Mostrar Pasos';
            }
        });
    }

    const nav = document.createElement('nav');
    nav.innerHTML = `
        <a href="#">Inicio</a>
        <a href="#">Recetas</a>
        <a href="#">Contacto</a>
    `;
    document.body.insertBefore(nav, document.querySelector('header'));

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Sitio en mantenimiento');
        });
    });
});