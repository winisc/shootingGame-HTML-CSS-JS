class Enemy{

    constructor(initial){ // atributos para o Player
        this.x = initial.x //define a posicao do objeto Player no eixo x
        this.y = initial.y //define a posicao do objeto Player no eixo y
        this.rotate = initial.rotate
        this.size = initial.size //define um valor para manipular o tamanho do Player
        this.step = initial.step //define um valor para manipular a "velocidade" do Player
        this.color = initial.color //define um valor para manipular a cor do Player
        this.image = initial.image //define um valor para manipular a sprite do Player
        this.element = this.createElement()
        this.map = document.querySelector('.map')
    }

    createElement(){ //método para definir as caracteristicas do Player
        const enemy = document.createElement('img') //cria um elemento 'img' em htlm

        enemy.src = `${this.image}` //define uma imagem para o objeto
        enemy.classList.add('player') //noemia uma classe em css para o objeto
        enemy.style.width= `${this.size}px` //define a largura do objeto
        enemy.style.height= `${this.size}px` //define a altura do objeto
        enemy.style.transform = `rotate(${this.rotate}deg)`;
        enemy.style.backgroundColor= `${this.color}` //define uma cor para o objeto
        enemy.style.userSelect = 'none' //remove a seleção com o mosue
        return enemy
    } 
    
    update(){ //método para implenmentar funções que serão constantemente executadas
        this.move() //chama a movimentacao do Player
        this.draw() //"desenha" o Player de acordo com a sua posicao
    }

    move(){
        this.x -= this.step
    }

    awaitForTime(seconds) {
        return new Promise(resolve => setTimeout(resolve,(seconds*1000))) 
    }

    draw(){
        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`
    }
}