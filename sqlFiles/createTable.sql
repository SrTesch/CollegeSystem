create schema college_system;

use college_system;


-- Tabela setores
create table setor(
	  cod_setor int primary key,
    nome varchar(100) not null
);


-- Tabela de Cursos
create table cursos(
	  cod_curso int primary key,
    nome varchar(100) not null,
    ano_inicio int not null
);

-- Tabela Funcionários administrativos
create table admFunc(
	CPF char(11) not null primary key,
    nome varchar(150) not null,
    endereco varchar(150) not null,
    salário DECIMAL(10,2) not null,
    cod_setor int not null,
    foreign key(cod_setor) references setor(cod_setor)
);

-- Tabela Professores
create table professores(
  CPF char(11) primary key,
  nome varchar(100) not null,
  telefone char(11) not null,
  endereco varchar(150) not null,
  data_contratacao date not null,
  salario DECIMAL(10, 2) not null,
  ativo boolean not null,
  cod_curso int,
  foreign key (cod_curso) references cursos(cod_curso)
);

-- Tabela disciplina
create table disciplina (
  cod_disc int primary key,
  nome varchar(100) not null,
  CPF_prof char(11) not null,
  foreign key (CPF_prof) references professores(CPF)
);
-- Tabela Aluno
create table aluno (
  CPF char(11) primary key,
  nome varchar(100) not null,
  telefone varchar(20) not null,
  endereco varchar(150) not null,
  ativo boolean
);

-- Tabela Matrícula
create table matricula(
cod_disc int,
CPF_aluno char(11),
data_inicio date,
foreign key(cod_disc) references disciplina(cod_disc),
foreign key(CPF_aluno) references aluno(CPF)
);

create table notas(
cod_disc int,
CPF_aluno char(11),
nota DECIMAL(5,2),
foreign key (cod_disc) references disciplina(cod_disc),
foreign key (CPF_aluno) references aluno(CPF)
);