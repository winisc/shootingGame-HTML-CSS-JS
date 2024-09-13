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
let state = null

async function getUser() {
    await fetch('https://api-production-1b3c.up.railway.app/score')
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
    
    }

    async function postUser(username, score) {
       await fetch('https://api-production-1b3c.up.railway.app/score', {
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
            console.log('Resposta do servidor:', data);
            
            if (data.code && data.code === "ER_DUP_ENTRY") {
                state = "Duplicado";
                return
            }

            state = "Disponivel";
            return

        })
        .catch((error) => {
            console.error('Erro ao enviar dados:', error);
            state = "Erro"
        });

    }

async function updateUser(username, score) {
    await fetch(`https://api-production-1b3c.up.railway.app/score/${username}`, {
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

window.getUser = getUser
window.postUser = postUser;
window.updateUser = updateUser;
window.duplicateUser = duplicateUser
