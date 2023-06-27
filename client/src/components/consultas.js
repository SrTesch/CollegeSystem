import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Cons1 from "./cons1";
import Cons2 from "./cons2";
import Cons3 from "./cons3";
import Cons7 from "./cons7";
import Cons8 from "./cons8";

export default function Consultas(){

    const [renderCon1, setCon1] = useState(false);
    const [renderCon2, setCon2] = useState(false);    
    const [renderCon3, setCon3] = useState(false);    
    const [renderCon7, setCon7] = useState(false);    
    const [renderCon8, setCon8] = useState(false);    

    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>CollegeSystem</h1>

            <nav className="navInicial">
                <button className="consBut" onClick={() => setCon1(true)}>Turmas com mais Alunos ativos</button>
                <button className="consBut" onClick={() => setCon2(true)}>Quantos professores ativos em cada curso</button>
                <button className="consBut" onClick={() => setCon3(true)}>Média salarial dos professores (por curso)</button>
                <button className="consBut" onClick={() => setCon7(true)}>Quantos cursos cada professor trabalha</button>
                <button className="consBut" onClick={() => setCon8(true)}>Qual o professor mais antigo</button>
            </nav>
            <div>
                { renderCon1 && <Cons1 setRenderCon={setCon1} />}
                { renderCon2 && <Cons2 setRenderCon={setCon2} />}
                { renderCon3 && <Cons3 setRenderCon={setCon3} />}
                { renderCon7 && <Cons7 setRenderCon={setCon7} />}
                { renderCon8 && <Cons8 setRenderCon={setCon8} />}
            </div>
        </div>
    )
}