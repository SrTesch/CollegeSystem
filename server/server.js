const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

//sudo systemctl start snapd.apparmor

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "eusoulindo"
});

app.get('/', (req, res) =>{
    res.send("Eusoulindo");
});

app.get('/employees', (req, res) =>{
    db.query("SELECT * FROM employees", (err, result) => {
        if (err)
            console.log(err)
        else
            res.send(result)
    })
});

app.post('/create', (req, res)=>{
    const name = req.body.name
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const salary = req.body.salary

    db.query(
        'INSERT INTO employees (name, age, country, position, salary) VALUES (?,?,?,?,?)', [name, age, country, position, salary], (err, result) => {
            if(err){
                console.log(err);
                res.send(err);
            }else
                res.send("Success in insert request!");
        }
    );
});


app.listen(3001, ()=>{
    console.log("Wow, your server is running on port 3001")
})