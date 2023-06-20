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
from matricula as m
join notas as n on m.CPF_aluno = n.CPF_aluno and m.cod_disc = n.cod_disc
where n.nota < 6 -- Considerando nota 6 como aprovação
group by m.CPF_aluno, m.cod_disc
having num_reprovacoes > 3;

-- 1.8.5
select s.nome as departamento, SUM(f.salario) as folha_pagamento
from setor as s
left join admFunc as f on s.cod_setor = f.cod_setor
left join professores as p on s.cod_setor = p.cod_curso
group by s.nome
order by folha_pagamento desc;

--1.8.6
select d.cod_disc, d.nome as disciplina, AVG(n.nota) as media_final
from disciplina as d
join notas as n on d.cod_disc = n.cod_disc
where d.CPF_prof = 'CPF_DO_PROFESSOR' -- Substituindo por um cpf específico
group by d.cod_disc, d.nome;

-- 1.8.7
select CPF, nome, COUNT(cod_curso) as quantidade_cursos
from professores
group by CPF, nome
order by quantidade_cursos, nome;

-- 1.8.8
select CPF, nome, data_contratacao
from professores
order by data_contratacao asc
limit 1;

--1.8.9
select c.cod_curso, c.nome as nome_curso, COUNT(a.CPF) as total_alunos
from cursos as c
join aluno as a on c.cod_curso = a.cod_curso
group by c.cod_curso, c.nome;

--1.8.10
select d.cod_disc, d.nome as disciplina, 
       COUNT(case when n.nota < 6 then 1 end) as num_reprovados,
       COUNT(case when n.nota >= 6 then 1 end) as num_aprovados,
       (COUNT(case when n.nota < 6 then 1 end) / COUNT(*)) * 100 as taxa_reprovacao
from disciplina as d
join notas as n ON d.cod_disc = n.cod_disc
WHERE n.data_avaliacao between '2022-01-01' and '2022-12-31' -- Substituindo por uma data de sua necessidade
group by d.cod_disc, d.nome
order by taxa_reprovacao desc;
