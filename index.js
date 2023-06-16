let monedas = 10

/*
Arreglo que contiene todoas los animales de la ruleta
*/
const rueda = [
    ['🐈', '🐕', '🐤', '🐢', '🐏', '🐏', '🐏', '🐢', '🐢', '🐕', '🐕', '🐈', '🐈'], 
    ['🐕', '🐤', '🐈', '🐏', '🐢', '🐏', '🐏', '🐢', '🐢', '🐕', '🐕', '🐈', '🐈'], 
    ['🐤', '🐈', '🐕', '🐢', '🐏', '🐏', '🐏', '🐢', '🐢', '🐕', '🐕', '🐈', '🐈']
]

/*
Clase que contiene todos los premios
*/
const premios = {
    bajo: {
        minimo: 0
    }, 
    mendio: {

    }, 
    alto: {
        
    }
}

/*
Función para mostrar la "animación" de rodar la ruleta, 
y que se escuche el sonido de la ruleta, durando 7,4 segundos
*/
function mostrar() {
    let sonido = new Audio("assets/ruleta.mp3")
    sonido.play()
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            const celda = document.getElementById(i + "" + j)
            celda.innerText = "❓"
        }
    }
    setTimeout(demostrar, 7400)
}

/*
Le añade a la ruleta los animales dependiendo de la id de las casillas 
en el arreglo original, después se procede a verificar el puntaje
*/
function demostrar() {
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            const celda = document.getElementById(i + "" + j)
            celda.innerText = rueda[i - 1][j - 1]
        }
    }
    verificar()
}

/*
Se desordena una lista interna del arreglo de animales
*/
function desordenar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/*
se le añade el texto de forma correcta dependiendo 
de la cantidad de veces que se logró una racha
*/
function revisar(original, nueva) {
    return (original.length != 0) ? original + " y " + nueva : nueva
}

/*
Se actualiza el texto a la cantidad de monedas
*/
function actualizar() {
    let texto = document.getElementById("monedas")
    texto.innerText = 'Monedas que tienes: ' + monedas + ' 💰'
}

/*
Verifica si se tiene una (o múltiples rachas), y se guarda el tipo 
en la variable racha, después se revisa el tipo de racha, 
si pierde, se le quitará una cantidad de monedas;
si se gana, se le añadirá la cantidad de monedas, 
la cual se multiplicará dependiendo de la cantidad de rachas.
Después se le anuncia al usuario su estado monetario y si se perdió o no
*/
function verificar() {
    let racha = ""
    let celdas = document.getElementsByTagName("td")
    for (let i = 0; i <= 6; i+=3) {
        if (celdas.item(i).innerText == celdas.item(i + 1).innerText && 
            celdas.item(i + 2).innerText == celdas.item(i).innerText) {
            console.log("Lo lograste, ¡ganaste! (en horizontal)");
            racha = revisar(racha, "horizontal")
        }
    }
    for (let i = 0; i <= 2; i++) {
        if (celdas.item(i).innerText == celdas.item(i + 3).innerText && 
            celdas.item(i + 6).innerText == celdas.item(i).innerText) {
            console.log("lo lograste, ¡ganaste! (en vertical)");
            racha = revisar(racha, "vertical")
        }
    }
    if (celdas.item(0).innerText == celdas.item(4).innerText && 
        celdas.item(8).innerText == celdas.item(0).innerText) {
        console.log("lo lograste, ¡ganaste! (en diagonal principal)");
        racha = revisar(racha, "diagonal principal")
    }
    if (celdas.item(2).innerText == celdas.item(4).innerText && 
        celdas.item(6).innerText == celdas.item(2).innerText) {
        console.log("lo lograste, ¡ganaste! (en diagonal secundaria)");
        racha = revisar(racha, "diagonal secundaria")
    }
    if (racha.length != 0) {
        rachas(racha)
        let campana = new Audio("assets/campanita.wav")
        campana.play()
        let nuevas = (racha.includes('y')) ? ((racha.split('y').length) * 10) : 10
        monedas += nuevas
        actualizar()
        ganar(nuevas)
        
    } else {
        monedas--
        actualizar()
        perder()
    }
}

function premiar() {
    
}

/*
Desordena cada lista dentro del arreglo de animales
*/
function mover() {
    desordenar(rueda)
    desordenar(rueda[0])
    desordenar(rueda[1])
    desordenar(rueda[2])
    mostrar()
    console.log(rueda);
}

/*
Se dice la o las rachas al usuario
*/
function rachas(racha) {
    Swal.fire({
        title: '¡Ganaste!', 
        text: 'Lo lograste en una racha ' + racha + ' :D', 
        icon: 'success'
    })
}

/*
Se le anuncia al usuario que ha ganado
*/
function ganar(ganadas) {
    Swal.fire({
        icon: 'success',
        title: '¡Ganaste!',
        text: 'Ganaste ' + ganadas + ' 💰'
    })
}

/*
Se le anuncia al usuario que ha perdido
*/
function perder() {
    Swal.fire({
        icon: 'info', 
        title: '¡Mejor suerte la próxima!', 
        text: '¡Oh no! perdiste 1 💰'
    })
}

/*
Es la función que inicia todo
*/
function inicio() {
    actualizar()
}

inicio()