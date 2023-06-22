import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "../components/Home";
import Setor from "../components/Setor";
import Cursos from "../components/Cursos";
import Func from "../components/Funcionarios";
import Disciplinas from "../components/disciplinas";
import Professores from "../components/professores";
import Alunos from "../components/aluno";

const Rotas = () => {
   return(
       <BrowserRouter>
        <Routes>
            <Route  path="/" element={<Home />} exact />
            <Route path="/setor" element={<Setor />}/>
            <Route path="/cursos" element={<Cursos />}/>
            <Route path="/func" element={<Func />}/>
            <Route path="/disc" element={<Disciplinas />}/>
            <Route path="/profs" element={<Professores />}/>
            <Route path="/alunos" element={<Alunos />}/>
        </Routes>
       </BrowserRouter>
   )
}

export default Rotas;