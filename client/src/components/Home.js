import React from "react";
import { Link } from "react-router-dom";
import "../App.css"
export default function Home(){
    return(
        <div>
            <h1>CollegeSystem</h1>

            <nav className="navInicial">
            <Link to="/gerenciamento/" className="navButtons">Gerenciar Cadastros</Link> <br />
            </nav>
        </div>
    )
}