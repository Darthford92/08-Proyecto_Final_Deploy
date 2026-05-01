document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const terminosCheck = document.getElementById("terminos");
    const btnCrear = document.getElementById("btnCrear");
    const passwordInput = document.getElementById("contraseña");
    const confirmarInput = document.getElementById("confirmar");
    const togglePassword = document.getElementById("togglePassword");
    const modal = document.getElementById("modal");
    const cerrarModal = document.getElementById("cerrarModal");
    const mensajeModal = document.getElementById("mensajeModal");

    btnCrear.disabled = true;

    terminosCheck.addEventListener("change", function() {
        btnCrear.disabled = !terminosCheck.checked;
    });

    togglePassword.addEventListener("click", function() {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        this.textContent = type === "password" ? "👁️" : "🙈";
    });

    function mostrarModal(mensaje) {
        mensajeModal.textContent = mensaje;
        modal.style.display = "flex";
    }

    cerrarModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const password = passwordInput.value;
        const confirmar = confirmarInput.value;
        const nacimiento = document.getElementById("nacimiento").value;
        const nivel = document.getElementById("nivel").value;
        let especialidad = "";
        if (document.getElementById("frontend").checked) especialidad = "frontend";
        if (document.getElementById("backend").checked) especialidad = "backend";

        if (!nombre || !email || !usuario || !password || !nacimiento || !especialidad) {
            mostrarModal("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (password.length < 6) {
            mostrarModal("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmar) {
            mostrarModal("Las contraseñas no coinciden.");
            return;
        }

        const usuarioData = {
            nombre: nombre,
            email: email,
            usuario: usuario,
            password: password,
            nacimiento: nacimiento,
            nivel: nivel,
            especialidad: especialidad,
            fechaRegistro: new Date().toISOString()
        };

        let usuarios = [];
        const stored = localStorage.getItem("appwiseUsuarios");
        if (stored) {
            usuarios = JSON.parse(stored);
        }
        const existe = usuarios.some(u => u.email === email || u.usuario === usuario);
        if (existe) {
            mostrarModal("Ya existe un usuario con ese correo o nombre de usuario.");
            return;
        }

        usuarios.push(usuarioData);
        localStorage.setItem("appwiseUsuarios", JSON.stringify(usuarios));
        mostrarModal("Usuario registrado con éxito.\nAhora puedes iniciar sesión.");
        form.reset();
        btnCrear.disabled = true;
        terminosCheck.checked = false;
        passwordInput.setAttribute("type", "password");
        if (togglePassword) togglePassword.textContent = "👁️";
    });
});