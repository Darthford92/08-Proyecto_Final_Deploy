document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("userDialog");
    const btnNuevoUsuario = document.getElementById("new_user");
    const cancelarDialog = document.getElementById("cancelarDialog");
    const userForm = document.getElementById("userForm");
    const nuevoUsuarioInput = document.getElementById("nuevoUsuario");
    const tablaBody = document.getElementById("tablaBody");
    const usuariosActivosSpan = document.getElementById("usuariosActivos");
    const porcentajeSpan = document.getElementById("porcentajeUsuarios");
    const ticketsPendientesSpan = document.getElementById("ticketsPendientes");
    const ticketsCard = document.getElementById("cardTickets");
    const searchInput = document.getElementById("search");
    const avatarBtn = document.getElementById("avatarBtn");
    const menuLinks = document.querySelectorAll("aside nav a");
    const configLink = document.querySelector('aside nav a[data-page="configuracion"]');
    const usuariosLink = document.querySelector('aside nav a[data-page="usuarios"]');
    const dashboardLink = document.querySelector('aside nav a[data-page="dashboard"]');

    let usuariosRegistrados = [];
    let porcentajeCrecimiento = 5;

    function cargarUsuariosLocal() {
        const data = localStorage.getItem("adminUsuarios");
        const porcentajeGuardado = localStorage.getItem("adminPorcentaje");
        if (data) {
            usuariosRegistrados = JSON.parse(data);
        } else {
            usuariosRegistrados = ["carlos.dev", "ana.ui", "juan.perez"];
        }
        if (porcentajeGuardado) {
            porcentajeCrecimiento = parseInt(porcentajeGuardado);
        } else {
            porcentajeCrecimiento = 5;
        }
        actualizarContadorUsuarios();
        actualizarPorcentaje();
    }

    function actualizarContadorUsuarios() {
        usuariosActivosSpan.textContent = usuariosRegistrados.length;
        localStorage.setItem("adminUsuarios", JSON.stringify(usuariosRegistrados));
    }

    function actualizarPorcentaje() {
        porcentajeSpan.textContent = `+${porcentajeCrecimiento}% esta semana`;
        localStorage.setItem("adminPorcentaje", porcentajeCrecimiento);
    }

    function agregarActividad(nuevoUsuario) {
        const ahora = new Date();
        const fechaStr = `${ahora.getDate()} ${ahora.toLocaleString('es', { month: 'short' })}, ${ahora.getHours()}:${ahora.getMinutes().toString().padStart(2,'0')}`;
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${fechaStr}</td>
            <td class="user">${nuevoUsuario}</td>
            <td class="acction">Registró nueva cuenta</td>
            <td><span class="status">Completado</span></td>
        `;
        tablaBody.prepend(fila);
        porcentajeCrecimiento += 1;
        actualizarPorcentaje();
    }

    btnNuevoUsuario.addEventListener("click", () => {
        modal.showModal();
    });

    cancelarDialog.addEventListener("click", () => {
        modal.close();
        nuevoUsuarioInput.value = "";
    });

    userForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const nuevo = nuevoUsuarioInput.value.trim();
        if (nuevo === "") return;
        if (!usuariosRegistrados.includes(nuevo)) {
            usuariosRegistrados.push(nuevo);
            actualizarContadorUsuarios();
            agregarActividad(nuevo);
        }
        modal.close();
        nuevoUsuarioInput.value = "";
    });

    searchInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            const filtro = searchInput.value.toLowerCase();
            const filas = tablaBody.querySelectorAll("tr");
            filas.forEach(fila => {
                const texto = fila.innerText.toLowerCase();
                if (texto.includes(filtro)) {
                    fila.style.display = "";
                } else {
                    fila.style.display = "none";
                }
            });
        }
    });

    avatarBtn.addEventListener("click", function() {
        alert("Administrador: Admin\nEmail: admin@appwise.com\nRol: Superusuario");
    });

    ticketsCard.addEventListener("click", function() {
        alert("🚧 Sección en mantenimiento. Próximamente podrás gestionar tickets.");
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const pagina = this.getAttribute("data-page");
            if (pagina === "dashboard") {
                alert("📊 Dashboard: Resumen general del sistema. Aquí verás métricas clave.");
            } else if (pagina === "usuarios") {
                document.getElementById("table_section").scrollIntoView({ behavior: "smooth" });
                alert("👥 Sección Usuarios: Listado completo. Próximamente podrás editar o eliminar.");
            } else if (pagina === "reportes") {
                alert("📈 Sección Reportes en construcción. Volveremos con estadísticas detalladas.");
            } else if (pagina === "configuracion") {
                const opcion = confirm("Configuración avanzada:\n¿Deseas eliminar el último usuario agregado?\n(Click Cancelar para ver opciones de admin)");
                if (opcion) {
                    if (usuariosRegistrados.length > 3) {
                        const eliminado = usuariosRegistrados.pop();
                        actualizarContadorUsuarios();
                        alert(`Usuario ${eliminado} eliminado.`);
                        porcentajeCrecimiento = Math.max(0, porcentajeCrecimiento - 1);
                        actualizarPorcentaje();
                    } else {
                        alert("No se pueden eliminar los usuarios por defecto.");
                    }
                } else {
                    const darPoder = confirm("¿Dar permisos de administrador a algún usuario? (Escribe el nombre)");
                    if (darPoder) {
                        const nombre = prompt("Nombre del usuario:");
                        if (nombre && usuariosRegistrados.includes(nombre)) {
                            alert(`✅ ${nombre} ahora es administrador.`);
                        } else if (nombre) {
                            alert(`❌ Usuario "${nombre}" no encontrado.`);
                        }
                    }
                }
            }
        });
    });

    function centrarTabla() {
        const table = document.querySelector("#table_section table");
        if (table) {
            table.style.margin = "0 auto";
            table.style.width = "100%";
        }
    }

    centrarTabla();
    cargarUsuariosLocal();
});