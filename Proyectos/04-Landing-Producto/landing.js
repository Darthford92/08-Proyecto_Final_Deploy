document.addEventListener("DOMContentLoaded", function() {
    let carrito = [];
    const carritoIcono = document.getElementById("carritoIcono");
    const contadorSpan = document.getElementById("contadorCarrito");
    const modal = document.getElementById("carritoModal");
    const listaCarritoDiv = document.getElementById("listaCarrito");
    const totalSpan = document.getElementById("totalCarrito");
    const vaciarBtn = document.getElementById("vaciarCarrito");
    const cerrarBtns = document.querySelectorAll(".cerrarModal, #cerrarCarritoBtn");
    const btnComprarDirecto = document.getElementById("btnComprarDirecto");

    function guardarCarrito() {
        localStorage.setItem("carritoTeclados", JSON.stringify(carrito));
    }

    function cargarCarrito() {
        const guardado = localStorage.getItem("carritoTeclados");
        if (guardado) {
            carrito = JSON.parse(guardado);
        }
        actualizarInterfaz();
    }

    function actualizarInterfaz() {
        const cantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contadorSpan.textContent = cantidad;
        renderizarModal();
        guardarCarrito();
    }

    function renderizarModal() {
        if (!listaCarritoDiv) return;
        if (carrito.length === 0) {
            listaCarritoDiv.innerHTML = "<p>Carrito vacío</p>";
            totalSpan.textContent = "0";
            return;
        }
        let html = "";
        let total = 0;
        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            html += `
                <div class="item-carrito">
                    <span>${item.modelo} x${item.cantidad}</span>
                    <span>$${subtotal.toFixed(2)}</span>
                    <button data-index="${index}">Eliminar</button>
                </div>
            `;
        });
        listaCarritoDiv.innerHTML = html;
        totalSpan.textContent = total.toFixed(2);
        document.querySelectorAll(".item-carrito button").forEach(btn => {
            btn.addEventListener("click", function(e) {
                const idx = parseInt(this.getAttribute("data-index"));
                carrito.splice(idx, 1);
                actualizarInterfaz();
            });
        });
    }

    function agregarAlCarrito(modelo, precio) {
        const existente = carrito.find(item => item.modelo === modelo);
        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({ modelo: modelo, precio: parseFloat(precio), cantidad: 1 });
        }
        actualizarInterfaz();
        mostrarToast(`${modelo} agregado al carrito`);
    }

    function mostrarToast(mensaje) {
        const toast = document.createElement("div");
        toast.textContent = mensaje;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "#333";
        toast.style.color = "white";
        toast.style.padding = "10px 20px";
        toast.style.borderRadius = "5px";
        toast.style.zIndex = "1002";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    vaciarBtn.addEventListener("click", function() {
        carrito = [];
        actualizarInterfaz();
    });

    carritoIcono.addEventListener("click", function() {
        modal.style.display = "flex";
    });

    cerrarBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            modal.style.display = "none";
        });
    });

    window.addEventListener("click", function(e) {
        if (e.target === modal) modal.style.display = "none";
    });

    document.querySelectorAll(".btnAgregar").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            const modelo = this.getAttribute("data-modelo");
            const precio = this.getAttribute("data-precio");
            agregarAlCarrito(modelo === "basico" ? "Modelo Básico" : "Modelo Ninja (PRO)", precio);
        });
    });

    btnComprarDirecto.addEventListener("click", function() {
        agregarAlCarrito("Modelo Ninja (PRO)", 99.99);
    });

    cargarCarrito();
});