import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Setor from "./Setor";
import Cursos from "./Cursos";
import Func from "./Funcionarios";

const Rotas = () => {
   return(
       <BrowserRouter>
        <Routes>
            <Route  path="/" element={<Home />} exact />
            <Route path="/setor" element={<Setor />}/>
            <Route path="/cursos" element={<Cursos />}/>
            <Route path="/func" element={<Func />}/>
        </Routes>
       </BrowserRouter>
   )
}

export default Rotas;