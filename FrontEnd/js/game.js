class Game{

    constructor(initial){
        this.map = document.querySelector('.map')
        this.instances = []
    }

    add(instance){
        this.map.insertAdjacentElement('beforeend', instance.element)
        this.instances.push(instance)
    }

    update(game){
        for(let i of game.instances){
            i.update()
        }
        requestAnimationFrame((t) => game.update(game))
    }
}
