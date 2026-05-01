// ============================================================
//  VIDEOJUEGO — El Oráculo
//  Demostración en vivo: while, if/else, variables, DOM básico
// ============================================================

// --- Estado del juego ---
let numeroSecreto = generarNumero();
let intentos = 0;
let juegoActivo = true;

// --- Funciones principales ---
function generarNumero() {
  return Math.floor(Math.random()*100)+1;
}

function adivinar() {
  if (!juegoActivo) return;
  intentos +=1;
  let numeroUsuario = Number(document.getElementById("inputNumero").value);
  document.getElementById("btnReset").style.display = "block";
    if (numeroUsuario === numeroSecreto){
      mostrarMensaje("¡Correcto!");
      mostrarIntentos(`Completaste el juego en ${intentos} intentos`);
      juegoActivo = false;
  } else if (numeroUsuario < numeroSecreto) {
      document.getElementById("inputNumero").value = "";
      mostrarMensaje("Muy Bajo");
      mostrarIntentos(`Vas ${intentos} intentos`);
  } else {
      document.getElementById("inputNumero").value = "";
      mostrarMensaje("Muy Alto");
      mostrarIntentos(`Vas ${intentos} intentos`);
  }
}

function reiniciar() {
  document.getElementById("inputNumero").value = "";
  document.getElementById("mensaje").textContent = "";
  document.getElementById("intentos").textContent = "";
  document.getElementById("btnReset").style.display = "none";
  intentos = 0;
  juegoActivo = true;
  numeroSecreto = generarNumero();
}

// --- Helpers de UI ---
function mostrarMensaje(texto) {
  document.getElementById("mensaje").textContent = texto;
}

function mostrarIntentos(texto) {
  document.getElementById("intentos").textContent = texto;
}

// Permitir presionar Enter para adivinar
document
  .getElementById("inputNumero")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") adivinar();
  });