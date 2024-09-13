class Enemy{

    constructor(initial){ // atributos para o Player
        this.x = initial.x //define a posicao do objeto Player no eixo x
        this.y = initial.y //define a posicao do objeto Player no eixo y
        this.rotate = initial.rotate
        this.size = initial.size //define um valor para manipular o tamanho do Player
        this.step = initial.step //define um valor para manipular a "velocidade" do Player
        this.color = initial.color //define um valor para manipular a cor do Player
        this.image = initial.image //define um valor para manipular a sprite do Player
        this.element = this.createElementNull()
        this.enemy = true
        this.map = document.querySelector('.map')

        this.sexo = true
        this.fuder = true
        this.leftPositionBullet = 0
        
    }

    createElementNull(){
        const enemyNull = document.createElement('div')

        enemyNull.classList.add('null')
        enemyNull.style.display = 'none'
        return enemyNull
    }

    createElement(){ //método para definir as caracteristicas do Player
        const enemy = document.createElement('img') //cria um elemento 'img' em htlm

        enemy.src = `${this.image}` //define uma imagem para o objeto
        enemy.id = "target"
        enemy.classList.add('enemy') //noemia uma classe em css para o objeto
        enemy.style.width= `${this.size}px` //define a largura do objeto
        enemy.style.height= `${this.size}px` //define a altura do objeto
        enemy.style.transform = `rotate(${this.rotate}deg)`;
        enemy.style.backgroundColor= `${this.color}` //define uma cor para o objeto
        enemy.style.userSelect = 'none' //remove a seleção com o mosue

        if(this.randomIntFromInterval(1, 3) === 1){
            enemy.style.left = `${this.x}px`
            enemy.style.top = `${this.y - (this.size + 60)}px`
        }
        else if(this.randomIntFromInterval(1, 3) === 2){
            enemy.style.left = `${this.x}px`
            enemy.style.top = `${this.y/2}px`
        }
        else{
            enemy.style.left = `${this.x}px`
            enemy.style.top = `${0}px`
        }


        return enemy
    } 

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    update(){ //método para implenmentar funções que serão constantemente executadas
        if(this.enemy){
            this.move() //chama a movimentacao do Player
            this.gerarTiming()
        }

        this.finishGame()
    }

    finishGame(){
        if(acabouGame()){
            this.enemy = false
        }
    }

    gerarTiming(){
        if(this.sexo && this.fuder){
            this.generateEnemies()
            this.timing()
            this.fuder = false
        }
    }

    async timing(){
        await this.awaitForTime(1)
        this.fuder = true
    }

    generateEnemies(){
        const enemy = this.createElement()
        this.map.insertAdjacentElement('beforeend', enemy)
    }

    move(){
        const enemys = document.querySelectorAll('.enemy')
        for(let i = 0; i < enemys.length; i++){
            if(enemys[i]){
                this.leftPositionBullet = enemys[i].offsetLeft
                this.leftPositionBullet -= this.step //velocidade da bala
                enemys[i].style.left = `${this.leftPositionBullet}px`
            }
        }
    }

    awaitForTime(seconds) {
        return new Promise(resolve => setTimeout(resolve,(seconds*1000))) 
    }
}

