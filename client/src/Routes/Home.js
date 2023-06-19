import React from "react";
import { Link } from "react-router-dom";
import "../App.css"
export default function Home(){
    return(
        <div>
            <h1>CollegeSystem</h1>

            <nav>
            <Link to="/setor" className="navButtons">Setores</Link> <br />
            <Link to="/cursos" className="navButtons">Cursos</Link> <br />
            <Link to="/func" className="navButtons">Funcionarios</Link>
            </nav>
        </div>
    )
}