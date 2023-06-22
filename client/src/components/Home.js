import React from "react";
import { Link } from "react-router-dom";
import "../App.css"
export default function Home(){
    return(
        <div>
            <h1>CollegeSystem</h1>

            <nav className="navInicial">
            <Link to="/setor" className="navButtons">Setores</Link> <br />
            <Link to="/cursos" className="navButtons">Cursos</Link> <br />
            <Link to="/disc" className="navButtons">Disciplinas</Link> <br />
            <Link to="/func" className="navButtons">Funcionários</Link> <br />
            <Link to="/profs" className="navButtons">Professores</Link> <br />
            <Link to="/alunos" className="navButtons">Alunos</Link>
            </nav>
        </div>
    )
}