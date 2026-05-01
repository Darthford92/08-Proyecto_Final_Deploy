document.addEventListener("DOMContentLoaded", function() {
    const mapFrame = document.getElementById("mapFrame");
    const enlaces = document.querySelectorAll("aside a");

    function generarEmbedURL(lat, lng) {
        return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1ses!2sar!4v0000000000000`;
    }

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", function(e) {
            e.preventDefault();
            const lat = this.getAttribute("data-lat");
            const lng = this.getAttribute("data-lng");
            if (lat && lng) {
                const nuevaURL = generarEmbedURL(lat, lng);
                mapFrame.src = nuevaURL;
                mapFrame.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                const direccion = this.getAttribute("data-direccion");
                if (direccion) {
                    alert(`Mapa no actualizado automáticamente. Busca en Google Maps: ${direccion}`);
                }
            }
        });
    });
});