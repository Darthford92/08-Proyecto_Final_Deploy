document.addEventListener("DOMContentLoaded", function() {
    const contenidoDinamico = document.getElementById("contenidoDinamico");

    const proyectosData = [
        { nombre: "Receta de la abuela", descripcion: "Página de receta semántica", icono: "fa-utensils", url: "01-receta/index.html" },
        { nombre: "Blog Hacker", descripcion: "Estructura de blog con article/aside", icono: "fa-blog", url: "02-blog/index.html" },
        { nombre: "Registro de usuarios", descripcion: "Formulario con validación y localStorage", icono: "fa-user-plus", url: "03-registro/index.html" },
        { nombre: "Landing page - Teclado", descripcion: "Producto con video, tabla y carrito", icono: "fa-store", url: "04-landing/index.html" },
        { nombre: "Gestor de tareas", descripcion: "Checklist interactivo con persistencia", icono: "fa-list-check", url: "05-tareas/index.html" },
        { nombre: "FAQ Acordeón", descripcion: "Preguntas frecuentes con desplegables", icono: "fa-circle-question", url: "06-faq/index.html" },
        { nombre: "Directorio de empleados", descripcion: "Tabla dinámica agregar/eliminar", icono: "fa-address-card", url: "07-directorio/index.html" },
        { nombre: "Carrito de compras", descripcion: "Tienda con modal y botones +/-", icono: "fa-cart-shopping", url: "08-carrito/index.html" },
        { nombre: "Buscador de sucursales", descripcion: "Mapa interactivo con iframe", icono: "fa-map-location-dot", url: "09-mapas/index.html" },
        { nombre: "Admin Panel Dashboard", descripcion: "Panel con métricas y gestión", icono: "fa-chart-line", url: "10-admin/index.html" }
    ];

    const juegosData = [
    { nombre: "Clase Oráculo", descripcion: "Juego educativo", icono: "fa-gamepad", url: "juegos/01-Videojuego-Clase-Oraculo/index.html" },
    { nombre: "Piedra Papel Tijeras", descripcion: "El clásico", icono: "fa-hand-back-fist", url: "juegos/02-Videojuego-Piedra-Papel-Tijeras/index.html" },
    { nombre: "Memotest", descripcion: "Memoriza y encuentra", icono: "fa-brain", url: "juegos/03-Videojuego-Memotest/index.html" },
    { nombre: "Whack‑A‑Mole", descripcion: "Golpea los topos", icono: "fa-bug", url: "juegos/04-Videojuego-WhackAMole/index.html" },
    { nombre: "Clicker", descripcion: "Incremental", icono: "fa-mouse-pointer", url: "juegos/05-Videojuego-Clicker/index.html" },
    { nombre: "Pong", descripcion: "Arcade clásico", icono: "fa-table-tennis-paddle-ball", url: "juegos/06-Videojuego-Pong/index.html" }
];

    class UICards {
        constructor(contenedor, items, claseFondo) {
            this.contenedor = contenedor;
            this.items = items;
            this.claseFondo = claseFondo;
        }
        render() {
            this.contenedor.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = this.claseFondo;
            const grid = document.createElement('div');
            grid.className = 'grid-cards';
            this.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-icon"><i class="fa-solid ${item.icono}"></i></div>
                    <h3>${item.nombre}</h3>
                    <p>${item.descripcion}</p>
                    <a href="${item.url}" class="btn">Ver proyecto</a>
                `;
                grid.appendChild(card);
            });
            wrapper.appendChild(grid);
            this.contenedor.appendChild(wrapper);
        }
    }

    class Presentacion {
        constructor(contenedor) {
            this.contenedor = contenedor;
        }
        render() {
            this.contenedor.innerHTML = `
                <div class="presentacion">
                    <h2><i class="fa-solid fa-chart-simple"></i> Mi Portafolio</h2>
                    <p>Hola, soy <strong>Rodrigo Vera</strong>, desarrollador full stack en formación y estudiante de desarrollo de videojuegos.</p>
                    <p>Este panel reúne todos los proyectos que he desarrollado durante el curso en Appwise Academy, así como algunos juegos interactivos.</p>
                    <p>Puedes explorar mis <strong>Proyectos Web</strong> (10 desafíos prácticos) y mis <strong>Juegos</strong> (implementados con canvas y POO). Cada tarjeta te llevará al proyecto en vivo.</p>
                    <p>Además, si te interesa ver mis trabajos de videojuegos, puedes visitar mi perfil de <a href="https://vera-rodrigo.itch.io/" target="_blank">Itch.io</a>.</p>
                </div>
            `;
        }
    }

    function mostrarInicio() {
        new Presentacion(contenidoDinamico).render();
    }

    function mostrarProyectos() {
        new UICards(contenidoDinamico, proyectosData, 'vista-proyectos').render();
    }

    function mostrarJuegos() {
        new UICards(contenidoDinamico, juegosData, 'vista-juegos').render();
    }

    const navLinks = document.querySelectorAll("aside nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const page = this.getAttribute("data-page");
            if (page === "inicio") mostrarInicio();
            else if (page === "proyectos") mostrarProyectos();
            else if (page === "juegos") mostrarJuegos();
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    mostrarInicio();
});