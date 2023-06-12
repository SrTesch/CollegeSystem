-- 1.8.1
select m.cod_disc, COUNT(m.CPF_aluno) as num_alunos
from matricula as m
group by m.cod_disc
order by num_alunos desc;

-- 1.8.2
select cod_curso, COUNT(*) as num_professores
from professores
where ativo = 1
group by cod_curso
order by num_professores desc;

-- 1.8.3
select cod_curso, AVG(salario) as media_salarial
from professores
group by cod_curso;


-- 1.8.4
select m.CPF_aluno, m.cod_disc, COUNT(*) as num_reprovacoes
from matricula AS m
join notas AS n ON m.CPF_aluno = n.CPF_aluno AND m.cod_disc = n.cod_disc
where n.nota < 6 -- Considerando nota 6 como aprovação
group by m.CPF_aluno, m.cod_disc
having num_reprovacoes > 3;