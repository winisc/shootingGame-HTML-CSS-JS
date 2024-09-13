const player = new Player({
    x: 0, //position x
    y: window.innerHeight/2, //position y
    size: 80, //tamanho
    step: 10, //"velocidade"
    color: 'none', //cor
    image: '/FrontEnd/assets/player.png', //sprite
})

const enemy = new Enemy({
    x: window.innerWidth,
    y: window.innerHeight,
    rotate: 90,
    size: 80, //tamanho
    step: 2, //"velocidade"
    color: 'none', //cor
    image: '/FrontEnd/assets/enemy.png' //sprite
})

const game = new Game()

async function startButton(){

    if(verificarUserName() != ""){

        postUser(verificarUserName(), 0)

        showLoadingPopup(1)
        await awaitForTime(1)
        if(duplicateUser() === 2){
            showPopup("ERROR")
            return
        }

        if(duplicateUser() === 0){

            showPopup("Success!", "success")

            await awaitForTime(.8)
            document.querySelector('form').style.display = 'none'
            document.querySelector('.hud-game').style.display = 'flex'

            game.add(player)
            game.add(enemy)

            return
        }

        showPopup("Nome de usuário já utilizado!", "error")
        return

    }
    showPopup("Digite um nome de usuário válido!", "error")

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

function showLoadingPopup(timer) {
    const popup = document.getElementById('loadingPopup');
    
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, timer*1000);
}


requestAnimationFrame((t) => game.update(game))

window.verificarUserName = verificarUserName
