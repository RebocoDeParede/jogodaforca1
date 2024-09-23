// variaveis
let palavraAtual;
let dicaAtual;
let letrasAdivinhadas = [];
const tentativasMaximas = 6;
let tentativasRestantes; // indica se jogo está em andamento

function iniciarJogo() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    palavraAtual = palavras[indiceAleatorio];
    dicaAtual = dicas[indiceAleatorio];
    letrasAdivinhadas = [];
    tentativasRestantes = tentativasMaximas;
    atualizarDisplayDoJogo();
}

function atualizarDisplayDoJogo() {
    let palavraExibida = "";
    for (let i = 0; i < palavraAtual.length; i++) {
        const letra = palavraAtual[i];
        if (letrasAdivinhadas.indexOf(letra) !== -1 || letra === " ") {
            palavraExibida += letra;
        } else {
            palavraExibida += "_";
        }
    }

    document.getElementById("palavra").textContent = palavraExibida;
    document.getElementById("dica").textContent = `Dica: ${dicaAtual}`;
    document.getElementById("status").textContent = `Tentativas restantes: ${tentativasRestantes}`;
    document.getElementById("attempts").textContent = `Letras já tentadas: ${letrasAdivinhadas.join(", ")}`;
}

function adivinharLetra() {
    const entradaAdivinhacao = document.getElementById("guess");
    const letraAdivinhada = entradaAdivinhacao.value.toLowerCase();

    if (letraAdivinhada.length === 1 && /^[a-záéíóúãõç\s]$/.test(letraAdivinhada)) {
        if (letrasAdivinhadas.indexOf(letraAdivinhada) === -1) {
            letrasAdivinhadas.push(letraAdivinhada);
            let letraNaoEncontrada = true;
            for (let i = 0; i < palavraAtual.length; i++) {
                if (palavraAtual[i] === letraAdivinhada) {
                    letraNaoEncontrada = false;
                    break;
                }
            }

            if (letraNaoEncontrada) {
                tentativasRestantes--;
            }

            atualizarDisplayDoJogo();
            desenharBoneco();

            let palavraCompleta = true;
            for (let i = 0; i < palavraAtual.length; i++) {
                if (letrasAdivinhadas.indexOf(palavraAtual[i]) === -1 && palavraAtual[i] !== " ") {
                    palavraCompleta = false;
                    break;
                }
            }

            if (palavraCompleta) {
                const statusElement = document.getElementById("status");
                statusElement.textContent = "Você venceu!";
                statusElement.classList.add("piscando"); // Adiciona a classe para começar a piscar
            } else if (tentativasRestantes <= 0) {
                document.getElementById("status").textContent = `Você perdeu! A palavra era: ${palavraAtual}`;
                document.getElementById("status").classList.remove("piscando"); // Remove a classe se o jogo acabar
            }
            
        }
    }
    entradaAdivinhacao.value = "";
}

document.addEventListener("DOMContentLoaded", iniciarJogo);
