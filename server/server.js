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
    password: "password",
    database: "college_system"
});

app.get('/', (req, res) =>{
    res.send("Eusoulindo");
});

app.post('/cadastroSetor', (req, res)=>{
    const cod_setor = req.body.cod_setor;
    const nome = req.body.nome;

    db.query('INSERT INTO setor (cod_setor, nome) VALUES (?,?)', [cod_setor, nome], (err, result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else
            res.send("Setor cadastrado com sucesso!");
    })
});

app.post('/cadastroCurso', (req, res)=>{
    const cod_curso = req.body.cod_curso;
    const nome = req.body.nome;
    const ano_inicio = req.body.ano_inicio;

    db.query('INSERT INTO setor (cod_curso, nome, ano_inicio) VALUES (?,?,?)', [cod_curso, nome, ano_inicio], (err, result)=>{
        if(err)
            res.send(err);
        else
            res.send("Curso cadastro com sucesso!");
    });
});

app.get('/getFunc', (req,res)=>{
    db.query('SELECT * FROM college_system.admFunc', (err,result)=>{
        if(err)
            res.send(err);
        else{
            console.log("teste");
            res.send(result);

        }    
    })
});

app.get('/getCursos', (req,res)=>{
    db.query('SELECT * FROM cursos', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

app.get('/getSetores', (req,res)=>{
    db.query('SELECT * FROM setor', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

app.get('/getDisc', (req,res)=>{
    db.query('SELECT * FROM disciplinas', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});


app.listen(3001, ()=>{
    console.log("Wow, your server is running on port 3001")
});