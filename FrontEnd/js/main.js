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

function startButton(){

    verificarUserName()

    document.querySelector('form').style.display = 'none'
    document.querySelector('.hud-game').style.display = 'flex'

    game.add(player)
    game.add(enemy)

}

function verificarUserName(){
    const user = document.getElementById('input-username').value
    console.log(user)
}


requestAnimationFrame((t) => game.update(game))

