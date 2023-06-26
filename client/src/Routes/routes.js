import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "../components/Home";
import Setor from "../components/genrenciamento/Setor";
import Cursos from "../components/genrenciamento/Cursos";
import Func from "../components/genrenciamento/Funcionarios";
import Disciplinas from "../components/genrenciamento/disciplinas";
import Professores from "../components/genrenciamento/professores";
import Alunos from "../components/genrenciamento/aluno";
import Gerencia from "../components/gerenciamento";

const Rotas = () => {
   return(
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path ="/gerenciamento/*" element={<Gerencia />} exact>
                <Route path="setor" element={<Setor />}/>
                <Route path="cursos" element={<Cursos />}/>
                <Route path="func" element={<Func />}/>
                <Route path="disc" element={<Disciplinas />}/>
                <Route path="profs" element={<Professores />}/>
                <Route path="alunos" element={<Alunos />}/>
            </Route>
        </Routes>
       </BrowserRouter>
   )
}

export default Rotas;