function useState(initialValue) {
    let state = initialValue;

    function getValue() {
        return state;
    }

    function setValue(newValue) {
        state = newValue;
    }

    return [getValue, setValue];
}

const [val, setVal] = useState([]);
let state = 2

fetch('http://localhost:8081/score')
    .then(res => res.json())
    .then(data => {

        setVal(data);

        let tabelaScoreBoard = data.slice(0, 10).map((item, index) =>
            `<tr>
                <td>${index + 1}</td>
                <td>${item.username}</td>
                <td>${item.score}</td>
            </tr>`

        ).join('');
        
        document.getElementById("score").innerHTML = tabelaScoreBoard;

    })
    .catch(err => console.error('Erro ao buscar dados:', err));

function postUser(username, score){
    fetch('http://localhost:8081/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            score: score
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.code === "ER_DUP_ENTRY"){ 
            state = 1
            return
        }

        state = 0
        return
        
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}

function updateUser(username, score) {
    fetch(`http://localhost:8081/score/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score: score
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Success", data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}

function duplicateUser(){
    return state
}


window.postUser = postUser;
window.updateUser = updateUser;
window.duplicateUser = duplicateUser
