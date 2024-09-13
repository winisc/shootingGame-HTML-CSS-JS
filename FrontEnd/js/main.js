getUser()

const player = new Player({
    x: 0, //position x
    y: window.innerHeight/2, //position y
    size: 80, //tamanho
    step: 10, //"velocidade"
    color: 'none', //cor
    image: '/assets/player.png', //sprite
})

const enemy = new Enemy({
    x: window.innerWidth,
    y: window.innerHeight,
    rotate: 90,
    size: 80, //tamanho
    step: 2, //"velocidade"
    color: 'none', //cor
    image: '/assets/enemy.png' //sprite
})

const game = new Game()

async function startButton() {
    const username = verificarUserName();

    if (username !== "") {
        showLoadingPopup();
        // Enviar o nome de usuário ao servidor
        await postUser(username, 0);

        const response = duplicateUser()

        if (response === "Erro") {
            hideLoadingPopup()
            showPopup("ERROR");
            return;
        }

        if (response === "Disponivel") {
            hideLoadingPopup()

            showPopup("Success!", "success");

            document.querySelector('form').style.display = 'none';
            document.querySelector('.hud-game').style.display = 'flex';


            timer(10)

            game.add(player);
            game.add(enemy);

            return;
        }

        hideLoadingPopup()
        showPopup("Nome de usuário já utilizado!", "error");
        return;
    }

    showPopup("Digite um nome de usuário válido!", "error");
}

function awaitForTime(seconds) {
    return new Promise(resolve => setTimeout(resolve,(seconds*1000)))
}

function verificarUserName(){
    const user = document.getElementById('input-username').value
    return user
}

function showPopup(message, check) {
    const popup = document.getElementById('popup');
    if(check === "success"){
        popup.style.backgroundColor = "#36f4463a"
    }
    else{
        popup.style.backgroundColor = "#f443363a";
    }

    popup.innerHTML = message

    popup.classList.remove('hidden');
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
        popup.style.backgroundColor = "#f443363a";
    }, 3000);
}

function showLoadingPopup() {
    const popup = document.getElementById('loadingPopup');
    popup.classList.add('show');
}

function hideLoadingPopup() {
    const popup = document.getElementById('loadingPopup');
    popup.classList.remove('show');
}

let timerGame = false

function timer(seconds) {
    let timeLeft = seconds;
    const timerDisplay = document.querySelector(".timer");

    // Exibe o tempo restante a cada segundo
    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `TEMPO: ${timeLeft}`;

        // Quando o contador chega a zero, para o intervalo
        if (timeLeft <= 0) {
            clearInterval(countdown);
        }
    }, 1000);

    // Finaliza o jogo após 10 segundos
    setTimeout(() => {
        player.finishGame();
        console.log("FINALIZOU");
    }, seconds*1000);

    console.log("INICIOU");
}


function acabouGame(){
    return timerGame
}

requestAnimationFrame((t) => game.update(game))

window.verificarUserName = verificarUserName
window.acabouGame = acabouGame
window.showLoadingPopup = showLoadingPopup
window.hideLoadingPopup = hideLoadingPopup
