const ganando = 5
const perdiendo = 2

let monedas = 10

/*
Arreglo que contiene todoas los animales de la ruleta
*/
const rueda = [
    ['🐈', '🐕', '🐤', '🐢', '🐏', '🐏', '🐏', '🐢', '🐢', '🐕', '🐕', '🐈', '🐈'], 
    ['🐕', '🐤', '🐈', '🐏', '🐢', '🐏', '🐏', '🐢', '🐢', '🐕', '🐕', '🐈', '🐈'], 
    ['🐤', '🐈', '🐕', '🐢', '🐏', '🐏', '🐏', '🐢', '🐢', '🐕', '🐕', '🐈', '🐈']
]

const premiosLista = {
    bajo: {
        minimo: 1, 
        maximo: 10, 
        lista: [
            {
                nombre: "Leche caliente con miel y canela", 
                descripcion: "Una bebida agradable para empezar el día, " + 
                '\nesa es la leche caliente con miel y canela', 
                imagen: "assets/leche_de_ponyo.webp"
            }
        ]
    }, 
    medio: {
        minimo: 11, 
        maximo: 20, 
        lista: [
            {
                nombre: "Caramel Macchiato Frappuccino", 
                descripcion: 'Una bebida agradable para un mediodía, ' + 
                '\nese es el Caramel Macchiato Frappucino', 
                imagen: "assets/frapuchino.webp"
            }
        ]
    }, 
    alto: {
        minimo: 21, 
        maximo: 30, 
        lista: [
            {
                nombre: "té de burbujas", 
                descripcion: 'Una bebida agradable para terminar un día, ' + 
                '\nese es el té de burbujas', 
                imagen: "assets/burbujas_te.png"
            }
        ]
    }
}

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

function demostrar() {
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            const celda = document.getElementById(i + "" + j)
            celda.innerText = rueda[i - 1][j - 1]
        }
    }
    verificar()
}

function desordenar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function revisar(original, nueva) {
    return (original.length != 0) ? original + " y " + nueva : nueva
}

function actualizar() {
    let texto = document.getElementById("monedas")
    texto.innerText = 'Monedas que tienes: ' + monedas + ' 💰'
}

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
        let nuevas = (racha.includes('y')) ? ((racha.split('y').length) * ganando) : ganando
        monedas += nuevas
        actualizar()
        ganar(nuevas)
    } else {
        monedas -= perdiendo
        actualizar()
        perder()
    }
}

function creacion_premios() {
    const premios = document.createElement("div")
    premios.id = "premios"
    premios.classList.add("invisible")
    const boton = document.getElementsByTagName("button")[document.getElementsByTagName("button").length - 1]
    boton.setAttribute("onclick", "premiar();")
    const ultimo = document.body.children[document.body.children.length -2]
    document.body.replaceChild(premios, ultimo)
    document.body.appendChild(ultimo)
}

function premiar() {
    const premios = document.getElementById("premios")
    premios.classList.remove('invisible')
    let lista = [premiosLista.bajo, premiosLista.medio, premiosLista.alto]
    for (const tipo of lista) {
        if (monedas >= tipo.minimo && monedas <= tipo.maximo) {
            premios.innerHTML = listar(tipo.lista)
            break
        }
    }
}

function listar(lista) {
    let info = '<p>Premios (acorde a tu presupuesto)</p>'
    for (const imagen of lista) {
        info += `
        <figure>
            <img src='${imagen.imagen}' alt='${imagen.nombre}}' width='50%'>
            <figcaption>${imagen.descripcion}</figcaption>
            </figure>
        `
    }
    return info
}

function mover() {
    desordenar(rueda)
    desordenar(rueda[0])
    desordenar(rueda[1])
    desordenar(rueda[2])
    mostrar()
    console.log(rueda);
}

function rachas(racha) {
    Swal.fire({
        title: '¡Ganaste!', 
        text: 'Lo lograste en una racha ' + racha + ' :D', 
        icon: 'success'
    })
}

function ganar(ganadas) {
    Swal.fire({
        icon: 'success',
        title: '¡Ganaste!',
        text: 'Ganaste ' + ganadas + ' 💰'
    })
}

function perder() {
    Swal.fire({
        icon: 'info', 
        title: '¡Mejor suerte la próxima!', 
        text: '¡Oh no! perdiste 1 💰'
    })
}

function inicio() {
    actualizar()
    creacion_premios()
}

inicio()