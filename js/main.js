const player = new Player({
    x: 0, //position x
    y: window.innerHeight/2, //position y
    size: 80, //tamanho
    step: 7, //"velocidade"
    color: 'none', //cor
    image: '/assets/player.png', //sprite
})

const enemy = new Enemy({
    x: window.innerWidth,
    y: window.innerHeight/2,
    rotate: 90,
    size: 80, //tamanho
    step: 2, //"velocidade"
    color: 'none', //cor
    image: '/assets/enemy.png' //sprite
})

const game = new Game()

function startButton(){
    document.querySelector('form').style.display = 'none'
    document.querySelector('.hud-game').style.display = 'flex'

    game.add(player)
   setInterval(game.add(enemy), 1000);   
}

requestAnimationFrame((t) => game.update(game))

