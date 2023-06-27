const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors())
app.use(express.json())


//Criando a conexão com o banco
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "college_system"
});

app.get('/', (req, res) =>{
    res.send("Servidor rodando com sucesso");
});

//Setores
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

app.get('/getSetores', (req,res)=>{
    db.query('SELECT * FROM setor', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});


app.delete('/deleteSetor', (req, res)=>{
    const cod_setor = req.body.cod_setor
    db.query('DELETE FROM setor WHERE cod_setor = ?', [cod_setor], (err,result) =>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.send("Setor deletado com sucesso!")
        }
    })
});

//Curso
app.get('/getCursos', (req,res)=>{
    db.query('SELECT * FROM cursos', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

app.post('/cadastroCurso', (req, res)=>{
    const cod_curso = req.body.cod_curso;
    const nome = req.body.nome;
    const ano_inicio = req.body.ano_inicio
    db.query('INSERT INTO cursos(cod_curso, nome, ano_inicio) VALUES (?,?,?)', [cod_curso, nome, ano_inicio], (err, result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else
            res.send("Curso cadastrado com sucesso!");
    })
});


app.delete('/deleteCurso', (req, res)=>{
    const cod_curso = req.body.cod_curso
    db.query('DELETE FROM cursos WHERE cod_curso = ?', [cod_curso], (err,result) =>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.send("Curso deletado com sucesso!")
        }
    })
});

//Disciplinas
app.post('/cadastroDisc', (req, res)=>{
    const cod_disc = req.body.cod_disc;
    const nome = req.body.nome;
    const CPF_prof = req.body.CPF_prof;
    
    db.query('INSERT INTO disciplina(cod_disc, nome, CPF_prof) VALUES (?,?,?)', [cod_disc, nome, CPF_prof], (err, result)=>{
        if(err)
        res.send(err);
        else
        res.send("Disciplina cadastrada com sucesso!");
    });
});


app.get('/getDisc', (req,res)=>{
    db.query('SELECT * FROM disciplina', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

app.delete('/deleteDisc', (req, res)=>{
    const cod_disc = req.body.cod_disc
    db.query('DELETE FROM disciplina WHERE cod_disc = ?', [cod_disc], (err,result) =>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.send("Disciplina deletada com sucesso!")
        }
    })
});

//Funcionários
app.post('/cadastroFunc', (req,res)=>{
    const CPF = req.body.cpf;
    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const salario = req.body.salário;
    const cod_setor = req.body.cod_setor;

    db.query('INSERT INTO admFunc(CPF, nome, endereco, salário, cod_setor) VALUES (?,?,?,?,?)', [CPF, nome, endereco, salario, cod_setor], (err, result) =>{
        if(err)
            res.send(err);
        else{
            res.send("Funcionario cadastrado com sucesso!");
            console.log(result);
        }
    })
});

app.get('/getFunc', (req,res)=>{
    db.query('SELECT * FROM admFunc', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);  
    })
});


app.delete('/deleteFunc', (req, res)=>{
    const CPF = req.body.CPF
    db.query('DELETE FROM admFunc WHERE CPF = ?', [CPF], (err,result) =>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.send("Funcionário deletado com sucesso!")
        }
    })
});

//PROFESSORES
app.post('/cadastroProf', (req,res)=>{
    const CPF = req.body.cpf;
    const nome = req.body.nome;
    const telefone = req.body.telefone
    const endereco = req.body.endereco;
    const salario = req.body.salario;
    const ativo = req.body.ativo;
    const cod_curso = req.body.cod_curso;

    db.query('INSERT INTO professores(CPF, nome, telefone, endereco, salário, ativo, cod_curso) VALUES (?,?,?,?,?,?,?)', [CPF, nome,telefone, endereco, salario,ativo, cod_curso], (err, result) =>{
        if(err)
            res.send(err);
        else{
            res.send("Professor cadastrado com sucesso!");
            console.log(result);
        }
    })
});

app.get('/getProf', (req,res)=>{
    db.query('SELECT * FROM professores', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);  
    })
});

app.delete('/deleteProf', (req, res)=>{
    const CPF = req.body.CPF
    db.query('DELETE FROM professores WHERE CPF = ?', [CPF], (err,result) =>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.send("Professores deletado com sucesso!")
        }
    })
});

//Alunos
app.post('/cadastroAlum', (req,res)=>{
    const CPF = req.body.cpf;
    const nome = req.body.nome;
    const telefone = req.body.telefone
    const endereco = req.body.endereco;
    const ativo = req.body.ativo;

    db.query('INSERT INTO aluno(CPF, nome, telefone, endereco, ativo) VALUES (?,?,?,?,?)', [CPF, nome,telefone, endereco, ativo], (err, result) =>{
        if(err)
            res.send(err);
        else{
            res.send("Aluno cadastrado com sucesso!");
            console.log(result);
        }
    })
});

app.get('/getAlum', (req,res)=>{
    db.query('SELECT * FROM aluno', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);  
    })
});

app.delete('/deleteAlum', (req, res)=>{
    const CPF = req.body.CPF
    db.query('DELETE FROM aluno WHERE CPF = ?', [CPF], (err,result) =>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.send("Professores deletado com sucesso!")
        }
    })
});

//Matriculas
app.post('/cadastroMat', (req, res)=>{
    const cod_disc = req.body.cod_disc;
    const CPF_aluno = req.body.CPF_aluno;
    const data_inicio = req.body.data_inicio;

    db.query('INSERT INTO matricula(cod_disc, CPF_aluno, data_inicio) VALUES (?,?,?)', [cod_disc, CPF_aluno, data_inicio], (err, result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else
            res.send("Matrícula efetuada com sucesso!");
    })
});

app.get('/getMat', (req,res)=>{
    db.query('SELECT d.nome AS disciplina_nome, a.nome AS aluno_nome, m.data_inicio FROM matricula m JOIN aluno a ON m.CPF_aluno = a.CPF JOIN disciplina d ON m.cod_disc = d.cod_disc;', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

app.delete('/deleteMat', (req, res)=>{
    const cod_disc = req.body.cod_disc
    const CPF_aluno = req.body.CPF_aluno
    db.query('DELETE FROM matricula WHERE cod_disc = ? and CPF_aluno = ?', [cod_disc, CPF_aluno], (err,result) =>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.send("Matrícula removida com sucesso!")
        }
    })
});

//Notas
app.post('/lancarNota', (req, res)=>{
    const cod_disc = req.body.cod_disc;
    const CPF_aluno = req.body.CPF_aluno;
    const nota = req.body.nota;

    db.query('INSERT INTO notas(cod_disc, CPF_aluno, nota) VALUES (?,?,?)', [cod_disc, CPF_aluno, nota], (err, result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else
            res.send("Nota Lançada com sucesso!");
    })
});

app.get('/getNotas', (req,res)=>{
    db.query('SELECT d.nome AS disciplina_nome, a.nome AS aluno_nome, n.nota FROM notas n JOIN aluno a ON n.CPF_aluno = a.CPF JOIN disciplina d ON n.cod_disc = d.cod_disc ORDER BY aluno_nome DESC;', (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

app.delete('/deleteNota', (req, res)=>{
    const cod_disc = req.body.cod_disc;
    const CPF_aluno = req.body.CPF_aluno;
    const nota = req.body.nota;
    db.query('DELETE FROM notas WHERE cod_disc = ? and CPF_aluno = ? and nota = ?', [cod_disc, CPF_aluno, nota], (err,result) =>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.send("Nota excluída com sucesso!")
        }
    })
});


//CONSULTAS

// old query
// 'SELECT d.nome AS disciplina_nome, a.nome AS aluno_nome, m.data_inicio FROM matricula m JOIN aluno a ON m.CPF_aluno = a.CPF JOIN disciplina d ON m.cod_disc = d.cod_disc;'

app.get('/getTurmasAlunos', (req,res)=>{
    db.query(`
    SELECT d.cod_disc, d.nome AS disciplina_nome, COUNT(m.CPF_aluno) AS num_alunos
    FROM matricula AS m
    JOIN disciplina AS d ON m.cod_disc = d.cod_disc
    GROUP BY m.cod_disc, d.nome
    ORDER BY num_alunos DESC; 
    `,  (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

app.get('/getNumProfAtivos', (req,res)=>{
    db.query('select cod_curso, COUNT(*) as num_professores from professores where ativo = true group by cod_curso order by num_professores desc;',  (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

app.get('/getMediaSalarial', (req,res)=>{
    db.query('select cod_curso, AVG(salario) as media_salarial from professores group by cod_curso;',
    (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

app.get('/getCursoProf', (req,res)=>{
    db.query('select CPF, nome, COUNT(cod_curso) as quantidade_cursos from professores group by CPF, nome order by quantidade_cursos, nome;',
    (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

app.get('/getProfAntigo', (req,res)=>{
    db.query('select CPF, nome, data_contratacao from professores order by data_contratacao asc limit 1;',
    (err,result)=>{
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});


app.listen(3001, ()=>{
    console.log("Wow, your server is running on port 3001")
});