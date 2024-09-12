function useState(value){

    let state = value

    function getValue(){
        return state
    }
    function setValue(newVal){
        state = newVal
    }

    return[getValue, setValue]
}


const [val, setVal] = useState([])

fetch('http://localhost:8081/score')
    .then(res => res.json())
    .then(data => {
        setVal(data)
        
        let tabelaScoreBoard = ""

        for(i = 0; i < val().length; i++){
            tabelaScoreBoard += 
            `<tr>
                <td>${i+1}</td>
                <td>${val()[i].username}</td>
                <td>${val()[i].score}</td>
            </tr>`
        }

        document.getElementById("score").innerHTML = tabelaScoreBoard
    }) // Atualiza o estado e exibe o valor atualizado
    .catch(err => console.log(err));




