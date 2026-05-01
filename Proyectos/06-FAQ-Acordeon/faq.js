document.addEventListener("DOMContentLoaded", function() {
    const detailsList = document.querySelectorAll("details");

    function guardarEstado() {
        const estados = [];
        detailsList.forEach((detail, index) => {
            estados.push(detail.open);
        });
        localStorage.setItem("faqEstados", JSON.stringify(estados));
    }

    function restaurarEstado() {
        const estadosGuardados = localStorage.getItem("faqEstados");
        if (estadosGuardados) {
            const estados = JSON.parse(estadosGuardados);
            detailsList.forEach((detail, index) => {
                if (estados[index] !== undefined) {
                    if (estados[index]) {
                        detail.setAttribute("open", "");
                    } else {
                        detail.removeAttribute("open");
                    }
                }
            });
        }
    }

    detailsList.forEach(detail => {
        detail.addEventListener("toggle", guardarEstado);
    });

    restaurarEstado();
});