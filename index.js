const rueda = [
    ['🐈', '🐕', '🐤', '🐢', '🐏', '🐏', '🐏', '🐢', '🐢', '🐕', '🐕', '🐈', '🐈'], 
    ['🐕', '🐤', '🐈', '🐏', '🐢', '🐏', '🐏', '🐢', '🐢', '🐕', '🐕', '🐈', '🐈'], 
    ['🐤', '🐈', '🐕', '🐢', '🐏', '🐏', '🐏', '🐢', '🐢', '🐕', '🐕', '🐈', '🐈']
]

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
        Swal.fire(
            "¡Ganaste!", 
            "Lo lograste en una racha " + racha + " :D", 
            "success"
        )
    }
}

function mover() {
    desordenar(rueda)
    desordenar(rueda[0])
    desordenar(rueda[1])
    desordenar(rueda[2])
    mostrar()
    console.log(rueda);
}