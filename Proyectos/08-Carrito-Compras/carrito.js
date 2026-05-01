document.addEventListener("DOMContentLoaded", function() {
    let carrito = [];
    const cartModal = document.getElementById("cartModal");
    const cartBtn = document.getElementById("cart");
    const closeModal = document.getElementById("closeModal");
    const cartItemsUl = document.getElementById("cartItems");
    const cartTotalSpan = document.getElementById("cartTotal");
    const cartCountSpan = document.getElementById("cartCount");
    const buyBtn = document.getElementById("buy");

    function guardarCarrito() {
        localStorage.setItem("tiendaCarrito", JSON.stringify(carrito));
    }

    function cargarCarrito() {
        const datos = localStorage.getItem("tiendaCarrito");
        if (datos) {
            carrito = JSON.parse(datos);
        }
        actualizarContador();
    }

    function actualizarContador() {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        cartCountSpan.textContent = totalItems;
    }

    function renderizarCarrito() {
        cartItemsUl.innerHTML = "";
        if (carrito.length === 0) {
            cartItemsUl.innerHTML = '<li class="empty-cart">No hay productos en el carrito</li>';
            cartTotalSpan.textContent = "0.00";
            return;
        }
        let total = 0;
        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            const li = document.createElement("li");
            li.innerHTML = `
                <div>
                    <strong>${item.nombre}</strong><br>
                    <small>$${item.precio} c/u</small>
                </div>
                <div class="cantidad-control">
                    <button class="decrement" data-index="${index}">-</button>
                    <span>${item.cantidad}</span>
                    <button class="increment" data-index="${index}">+</button>
                    <button class="remove_element" data-index="${index}">X</button>
                </div>
                <div><strong>$${subtotal.toFixed(2)}</strong></div>
            `;
            cartItemsUl.appendChild(li);
        });
        cartTotalSpan.textContent = total.toFixed(2);
        document.querySelectorAll(".increment").forEach(btn => {
            btn.addEventListener("click", function(e) {
                const idx = parseInt(this.getAttribute("data-index"));
                carrito[idx].cantidad++;
                guardarCarrito();
                actualizarContador();
                renderizarCarrito();
            });
        });
        document.querySelectorAll(".decrement").forEach(btn => {
            btn.addEventListener("click", function(e) {
                const idx = parseInt(this.getAttribute("data-index"));
                if (carrito[idx].cantidad > 1) {
                    carrito[idx].cantidad--;
                } else {
                    carrito.splice(idx, 1);
                }
                guardarCarrito();
                actualizarContador();
                renderizarCarrito();
            });
        });
        document.querySelectorAll(".remove_element").forEach(btn => {
            btn.addEventListener("click", function(e) {
                const idx = parseInt(this.getAttribute("data-index"));
                carrito.splice(idx, 1);
                guardarCarrito();
                actualizarContador();
                renderizarCarrito();
            });
        });
    }

    function agregarAlCarrito(id, nombre, precio) {
        const existente = carrito.find(item => item.id === id);
        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({ id: id, nombre: nombre, precio: parseFloat(precio), cantidad: 1 });
        }
        guardarCarrito();
        actualizarContador();
        renderizarCarrito();
    }

    cartBtn.addEventListener("click", function() {
        renderizarCarrito();
        cartModal.style.display = "flex";
    });

    closeModal.addEventListener("click", function() {
        cartModal.style.display = "none";
    });

    window.addEventListener("click", function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    buyBtn.addEventListener("click", function() {
        if (carrito.length === 0) {
            alert("No hay productos en el carrito.");
            return;
        }
        alert("Compra finalizada con éxito.\nTotal: $" + cartTotalSpan.textContent);
        carrito = [];
        guardarCarrito();
        actualizarContador();
        renderizarCarrito();
        cartModal.style.display = "none";
    });

    document.querySelectorAll(".add_product").forEach(btn => {
        btn.addEventListener("click", function(e) {
            const article = this.closest("article");
            const id = article.getAttribute("data-id");
            const nombre = article.getAttribute("data-nombre");
            const precio = article.getAttribute("data-precio");
            agregarAlCarrito(id, nombre, precio);
        });
    });

    cargarCarrito();
});