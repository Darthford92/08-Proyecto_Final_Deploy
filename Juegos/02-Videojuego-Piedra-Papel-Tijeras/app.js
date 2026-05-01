// ============================================================
//  TAREA — Videojuego: Piedra, Papel o Tijera
//  Tu código va en este archivo.
//  Leé el README.md para entender los requisitos.
// ============================================================

// Generación de variables globales
// activa o desactiva el juego según necesidad
let juegoActivo = true;

// toma todos los botones, menos el de reset, para activarlos o desactivarlos
let botones = document.querySelectorAll("button:not(#btnReset)");

// contadores, para el jugador, el empate y la pc
let miContador = 0;
let empate = 0;
let pc = 0;

// crea un elemento para el html en memoria (aún no se implementa en la página)
let div = document.createElement("div");
// le da un id al div anterior
div.id = "historial";
//posiciona el div dónde queramos dentro de la página, en este caso es hijo del body y se posiciona el final
document.body.appendChild(div);
//le damos al div un contenido inicial
div.textContent = "Historial: ";
//creamos la variable historial y metemos al div ahí
let historial = div;
//creamos un array que va a contener el historial de jugadas, máximo 5
let historialJugadas = [];

//función que con un array toma su número de posiciones, las randomiza
//y las baja a un número sin decimales, luego devuelve el valor que hay en esa posición.
function eleccionMaquina(){
    const opciones = ["piedra", "papel", "tijera"];
    let eleccion = opciones[Math.floor(Math.random() * opciones.length)];
    return eleccion;
}

// una función para poner emojis en vez de texto según la opción que tome
// el jugador o la maquina
function emojis(opcion){
  if (opcion === "piedra") {
    return "🪨";
  } else if (opcion === "papel") {
    return "📄";
  } else {
    return "✂️";
  }
}


//función para declarar ganador y desactivar el juego al obtener dos puntos de tres
function mejorDeTres(){
    if (miContador === 2) {
        document.getElementById("resultado").textContent = "¡Ganaste la partida!";
        // desactiva el juego para que no se pueda seguir eligiendo
        juegoActivo = false;
        //desactiva los botones de elección
        botones.forEach(boton => boton.disabled = true);
    } else if (pc === 2){
        document.getElementById("resultado").textContent = "¡Perdiste la partida!";
        juegoActivo = false;
        botones.forEach(boton => boton.disabled = true);
    }
}

//función para jugar
function jugar(opcionUsuario) {
  // crea una variable y llama a la función de elección de la maquina para 
  //que ella le asigne un valor.
  let jugadaMaquina = eleccionMaquina();
  //desactiva el juego cuando la función mejorDeTres cambie el valor de juegoActivo
  if (!juegoActivo) return;
  //actualiza los emojis según la elección del jugador o la maquina
    document.getElementById("eleccionJugador").textContent = emojis(opcionUsuario);
    document.getElementById("eleccionPC").textContent = emojis(jugadaMaquina);
    // evalua si la elección es igual para aumentar el puntaje de empate
  if (opcionUsuario === jugadaMaquina) {
    empate += 1;
    //también muestra mensajes según se ganó, empató o perdió
    document.getElementById("puntajeEmpate").textContent = empate;
    document.getElementById("resultado").textContent = "Empate";
  } else if 
  // evalua 3 condiciones de victoria del jugador y si se da alguna aumenta
  //el puntaje
    ((opcionUsuario === "piedra" && jugadaMaquina === "tijera") || 
    (opcionUsuario === "tijera" && jugadaMaquina === "papel") ||
    (opcionUsuario === "papel" && jugadaMaquina === "piedra")) 
    {
    miContador += 1;
    document.getElementById("resultado").textContent = "¡Ganaste!";
    document.getElementById("puntajeJugador").textContent = miContador;
  } else {
    // si las condiciones de victoria del jugador no se dan es porque ganó la maquina
    // aumenta el valor de su puntaje
    document.getElementById("resultado").textContent = "¡Perdiste!";
    pc += 1;
    document.getElementById("puntajePC").textContent = pc;
  }
  //crea una variable texto y le asigna el valor que eligio el usuario, el que eligio la maquina y muestra el resultado de ambas
  let texto = `${emojis(opcionUsuario)} vs ${emojis(jugadaMaquina)} → ${document.getElementById("resultado").textContent}`;
  //pushea a un array el resultado de lo que se guardó en texto
  historialJugadas.push(texto);
  // crea el titulo Historial dentro del div
  historial.innerHTML = "Historial:";
  //crea un for que recorre el array historialJugadas
  for (let i = 0; i < historialJugadas.length; i++) {
  let jugada = historialJugadas[i];
  //por cada historial de ronda guardado crea un p abajo de historial, que se guarda en la variable linea
  let linea = document.createElement("p");
  //cambia el contenido de P (creada antes) por el valor de la jugada
  linea.textContent = jugada;
  // mete a linea como hijo del div nuevo llamado historal
  historial.appendChild(linea);
  // si el array que guarda el historial tiene un tamaño mayor a 5, entonces borra la primer jugada
  //y deja la ultima
  if (historialJugadas.length > 5) {
  historialJugadas.shift();
  }
}
  //llama a mejor de tres para declarar ganador absoluto y reiniciar
  mejorDeTres();
}

//reinicia emojis, puntajes, mensajes y desactiva el juego.
function reiniciar () {
  //reactiva botones
    botones.forEach(boton => boton.disabled = false);
    //vuelve al juego activo
    juegoActivo = true;
    //reinicia emojis de jugadas
    document.getElementById("eleccionJugador").textContent = "❓";
    document.getElementById("eleccionPC").textContent = "❓";
    //reinicia variables de puntaje mediante texto
    document.getElementById("puntajeJugador").textContent = "0";
    document.getElementById("puntajeEmpate").textContent = "0";
    document.getElementById("puntajePC").textContent = "0";
    document.getElementById("resultado").textContent = "";
    // reinicia array de jugadas mediante código
    historialJugadas = [];
    // deja el historial vacío nuevamente
    historial.innerHTML = "";
    //reinicia variables de puntajes mediante código
    miContador = 0;
    empate = 0;
    pc = 0;
}