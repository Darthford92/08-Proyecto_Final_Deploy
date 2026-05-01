document.addEventListener("DOMContentLoaded", function() {
    let empleados = [];
    const tbody = document.getElementById("cuerpoTabla");
    const totalSpan = document.getElementById("totalEmpleados");
    const form = document.getElementById("formEmpleado");

    function guardarEmpleados() {
        localStorage.setItem("directorioEmpleados", JSON.stringify(empleados));
    }

    function cargarEmpleados() {
        const datos = localStorage.getItem("directorioEmpleados");
        if (datos) {
            empleados = JSON.parse(datos);
        } else {
            empleados = [
                { id: "001", nombre: "Ana Gómez", puesto: "Frontend Developer", email: "ana@appwise.com" },
                { id: "002", nombre: "Carlos Ruiz", puesto: "Backend Developer", email: "carlos@appwise.com" },
                { id: "003", nombre: "Laura Silva", puesto: "UX/UI Designer", email: "laura@appwise.com" }
            ];
        }
        renderizarTabla();
    }

    function renderizarTabla() {
        tbody.innerHTML = "";
        empleados.forEach((emp, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>#${emp.id}</td>
                <td>${emp.nombre}</td>
                <td>${emp.puesto}</td>
                <td><a href="mailto:${emp.email}">${emp.email}</a></td>
                <td><button class="btn-eliminar" data-id="${emp.id}">Eliminar</button></td>
            `;
            tbody.appendChild(fila);
        });
        totalSpan.textContent = empleados.length;
        guardarEmpleados();
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", function(e) {
                const id = this.getAttribute("data-id");
                empleados = empleados.filter(emp => emp.id !== id);
                renderizarTabla();
            });
        });
    }

    function generarNuevoId() {
        const numeros = empleados.map(emp => parseInt(emp.id, 10)).filter(n => !isNaN(n));
        const maxId = numeros.length ? Math.max(...numeros) : 0;
        return String(maxId + 1).padStart(3, "0");
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const puesto = document.getElementById("puesto").value.trim();
        const email = document.getElementById("email").value.trim();
        if (!nombre || !puesto || !email) return;
        const nuevoId = generarNuevoId();
        empleados.push({
            id: nuevoId,
            nombre: nombre,
            puesto: puesto,
            email: email
        });
        renderizarTabla();
        form.reset();
    });

    cargarEmpleados();
});