document.addEventListener("DOMContentLoaded", function() {
    const inputTarea = document.getElementById("new_task");
    const btnAgregar = document.getElementById("add_task");
    const lista = document.getElementById("listaTareas");
    const contadorP = document.getElementById("contadorPendientes");
    const btnLimpiar = document.getElementById("limpiarCompletadas");

    let tareas = [];

    function guardarTareas() {
        localStorage.setItem("gestorTareas", JSON.stringify(tareas));
    }

    function cargarTareas() {
        const datos = localStorage.getItem("gestorTareas");
        if (datos) {
            tareas = JSON.parse(datos);
        } else {
            tareas = [
                { id: Date.now() + 1, texto: "Estudiar etiquetas semánticas", completada: false },
                { id: Date.now() + 2, texto: "Tomar 2 litros de agua", completada: true },
                { id: Date.now() + 3, texto: "Avanzar en el proyecto de Github", completada: false }
            ];
        }
        renderizarTareas();
    }

    function renderizarTareas() {
        lista.innerHTML = "";
        tareas.forEach(tarea => {
            const li = document.createElement("li");
            const label = document.createElement("label");
            const check = document.createElement("input");
            check.type = "checkbox";
            check.checked = tarea.completada;
            check.addEventListener("change", function() {
                tarea.completada = check.checked;
                guardarTareas();
                renderizarTareas();
            });
            const span = document.createElement("span");
            span.textContent = tarea.texto;
            label.appendChild(check);
            label.appendChild(span);
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "X";
            btnEliminar.classList.add("button");
            btnEliminar.addEventListener("click", function() {
                tareas = tareas.filter(t => t.id !== tarea.id);
                guardarTareas();
                renderizarTareas();
            });
            li.appendChild(label);
            li.appendChild(btnEliminar);
            if (tarea.completada) li.classList.add("completada");
            lista.appendChild(li);
        });
        actualizarContador();
    }

    function actualizarContador() {
        const pendientes = tareas.filter(t => !t.completada).length;
        contadorP.textContent = `Tienes ${pendientes} tareas pendientes`;
    }

    btnAgregar.addEventListener("click", function() {
        const texto = inputTarea.value.trim();
        if (texto === "") return;
        const nuevaTarea = {
            id: Date.now(),
            texto: texto,
            completada: false
        };
        tareas.push(nuevaTarea);
        guardarTareas();
        renderizarTareas();
        inputTarea.value = "";
    });

    btnLimpiar.addEventListener("click", function() {
        tareas = tareas.filter(t => !t.completada);
        guardarTareas();
        renderizarTareas();
    });

    cargarTareas();
});