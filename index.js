const rueda = [
    ['🐈', '🐕', '🐤', '🐢', '🐏'], 
    ['🐕', '🐤', '🐈', '🐏', '🐢'], 
    ['🐤', '🐈', '🐕', '🐢', '🐏']
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
}

function desordenar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function verificar() {
    
}

function mover() {
    desordenar(rueda)
    desordenar(rueda[0])
    desordenar(rueda[1])
    desordenar(rueda[2])
    mostrar()
    console.log(rueda);
}