class EnemyGenerator{

    constructor(){
        this.map = document.querySelector('.map')
        this.instances = []
    }

    addEnemy(instance){
        this.map.insertAdjacentElement('beforeend', instance.element)
        this.instances.push(instance)
    }

}