import React from "react";
import { Link } from "react-router-dom";
import "../App.css"
export default function Gerencia(){
    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>CollegeSystem</h1>

            <nav className="navInicial">
            <Link to="/gerenciamento/setor" className="navButtons">Setores</Link> <br />
            <Link to="/gerenciamento/cursos" className="navButtons">Cursos</Link> <br />
            <Link to="/gerenciamento/disc" className="navButtons">Disciplinas</Link> <br />
            <Link to="/gerenciamento/func" className="navButtons">Funcionários</Link> <br />
            <Link to="/gerenciamento/profs" className="navButtons">Professores</Link> <br />
            <Link to="/gerenciamento/alunos" className="navButtons">Alunos</Link> <br />
            <Link to="/gerenciamento/matriculas" className="navButtons">Matrículas</Link> <br />
            <Link to="/gerenciamento/Notas" className="navButtons">Notas</Link>
            </nav>
        </div>
    )
}