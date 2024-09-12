class Player{

    constructor(initial){ // atributos para o Player
        this.x = initial.x //define a posicao do objeto Player no eixo x
        this.y = initial.y //define a posicao do objeto Player no eixo y
        this.size = initial.size //define um valor para manipular o tamanho do Player
        this.step = initial.step //define um valor para manipular a "velocidade" do Player
        this.color = initial.color //define um valor para manipular a cor do Player
        this.image = initial.image //define um valor para manipular a sprite do Player
        this.keyboard = { //define a booleana de movimentacao nos eixos x e y
            left: false, 
            right: false,
            up: false,
            down: false
        }
        this.element = this.createElement()
        this.initEvents() //método para instanciar eventos
        this.map = document.querySelector('.map')
        this.cW = window.innerWidth
        this.cH = window.innerHeight

        this.shooting = false
        this.atirar = false
        this.leftPositionBullet = 0

        this.value = 0
    }

    createElement(){ //método para definir as caracteristicas do Player
        const player = document.createElement('img') //cria um elemento 'img' em htlm

        player.src = `${this.image}` //define uma imagem para o objeto
        player.classList.add('player') //noemia uma classe em css para o objeto
        player.style.width= `${this.size}px` //define a largura do objeto
        player.style.height= `${this.size}px` //define a altura do objeto
        player.style.backgroundColor= `${this.color}` //define uma cor para o objeto
        player.style.userSelect = 'none' //remove a seleção com o mosue
        return player
    } 
    
    update(){ //método para implenmentar funções que serão constantemente executadas
        this.shootingBullet()
        this.move() //chama a movimentacao do Player
        this.collisionWall() //chama a colisão do Player
        this.draw() //"desenha" o Player de acordo com a sua posicao
        this.moveBullet()
        this.atualizarHud()
        this.winGame()
    }

    winGame(){
        let valueNow = 0
        if(this.value === 5){
            document.querySelector('form').style.display = 'flex'
            document.querySelector('.hud-game').style.display = 'none'
            valueNow = this.value
            document.getElementById('score-save').innerHTML = `${valueNow}`
            this.value = 0
        }
    }

    createBullet(){
        const bullet = document.createElement('div')

        bullet.classList.add('bullet')
        bullet.style.position = 'absolute'
        bullet.style.width = '10px'
        bullet.style.height = '10px'
        bullet.style.backgroundColor = 'red'
        bullet.style.left = `${this.x + this.size}px`
        bullet.style.top = `${this.y + (this.size/2)}px`
        // this.map.appendChild(bullet)
        return bullet
    }

    shootingBullet(){
        if(this.shooting && !this.atirar) {
            this.elementBullet = this.createBullet()
            this.map.insertAdjacentElement('beforeend', this.elementBullet)
            this.delayTiro()
        }
    }

    moveBullet(){
        const bullets = document.querySelectorAll('.bullet')
        const target = document.querySelectorAll('.enemy')

        for(let i = 0; i < bullets.length; i++){
            if(bullets[i]){
                this.leftPositionBullet = bullets[i].offsetLeft
                this.leftPositionBullet += 15  //velocidade da bala
                bullets[i].style.left = `${this.leftPositionBullet}px`
                this.deleteBulletLimits(bullets[i])
            }

            for(let j = 0; j < target.length; j++){
                this.colliderTarget(bullets[i], target[j])
            }
        }
    }

    colliderTarget(element, target){
        if (this.detectCollision(element, target)) {
            this.value ++
            this.deleteBullet(element)
            this.deleteBullet(target)
        }
    }

    atualizarHud(){
        const scoreHud = document.querySelector('.score')

        scoreHud.innerHTML = `SCORE: ${this.value}`
    }

    deleteBulletLimits(element){
        if((this.leftPositionBullet + 10) > this.cW) {
            element.remove()
        }
    }

    deleteBullet(element){
        element.remove()
    }

    detectCollision(bullet, target) {
        const bulletRect = bullet.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
    
        return !(
            bulletRect.top > targetRect.bottom ||
            bulletRect.bottom < targetRect.top ||
            bulletRect.left > targetRect.right ||
            bulletRect.right < targetRect.left
        );
    }

    move(){
        if(this.keyboard.right) this.x += this.step
        if(this.keyboard.left) this.x -= this.step
        if(this.keyboard.up) this.y -= this.step
        if(this.keyboard.down) this.y += this.step
    }

    collisionWall(){

        if(this.x < 0) this.x = 0
        if(this.y < 0) this.y = 0

        if((this.x + this.size) > this.cW) this.x = this.cW - this.size
        if((this.y + this.size) > this.cH) this.y = this.cH - this.size
    }

    awaitForTime(seconds) {
        return new Promise(resolve => setTimeout(resolve,(seconds*1000)))
    }

    async delayTiro(){
        this.atirar = true
        await this.awaitForTime(.5)
        this.atirar = false
    }

    draw(){
        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`
    }

    initEvents() {
        const p = this;
    
        const keyMapDown = {
            'a': () => { p.keyboard.left = true; /* movimentar para esquerda */ },
            'w': () => { p.keyboard.up = true; /* movimentar para cima */ },
            's': () => { p.keyboard.down = true; /* movimentar para baixo */ },
            'd': () => { p.keyboard.right = true; /* movimentar para direita */ },
            ' ': () => { p.shooting = true; }
        };
    
        document.body.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase();
            if (keyMapDown[key]) {
                keyMapDown[key]();
            }
        });

        const keyMapUp = {
            'a': () => { p.keyboard.left = false; /* movimentar para esquerda */ },
            'w': () => { p.keyboard.up = false; /* movimentar para cima */ },
            's': () => { p.keyboard.down = false; /* movimentar para baixo */ },
            'd': () => { p.keyboard.right = false; /* movimentar para direita */ },
            ' ': () => { p.shooting = false; }
        };

        document.body.addEventListener('keyup', (event) => {
            const key = event.key.toLowerCase();
            if (keyMapUp[key]) {
                keyMapUp[key]();
            }
        });
    }
}