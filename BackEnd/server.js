const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'score'
})

app.get('/', (req, res)=> {
    return res.json("From BackEnd Side")
})


app.get('/score', (req, res)=> {
    const sql = "SELECT * FROM scoreboard ORDER BY score DESC"
    db.query(sql, (err, data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post('/score', (req, res) => {
    const sql = "INSERT INTO scoreboard (`username`, `score`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.score
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put('/score/:username', (req, res) => {
    const sql = "UPDATE scoreboard SET `score` = (?) WHERE `username` = (?)"
    const values = [
        req.body.score,
        req.params.username
    ]
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8081, ()=> {
    console.log("listening")
})