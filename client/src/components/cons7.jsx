import React, { useState } from "react";
import Axios from 'axios';
import { useEffect } from "react";

export default function Cons7({ setRenderCon }) {
    const [cursos, setCursos] = useState([]);

    useEffect(()=>{
        updateList();
    }, []);
    
    const updateList = () =>{
        Axios.get("http://localhost:3001/getCursoProf").then((response)=>{
          console.log(response.data);
          console.log("passei no updateList");
          setCursos(response.data);
        });
    }
    return(
        <div className="popUpCons">
            <button className="closePopUp" onClick={e=>{setRenderCon(false)}}>X</button>
            <h1 style={{color:"white"}}>Cursos</h1>
            <div className="tableList">
                <div className="titleList">
                    <span className="atributo">Cpf</span>
                    <span className="atributo">Nome do Professor</span>
                    <span className="atributo">Número de Cursos</span>
                </div>
                    <hr />
                    {cursos.map((val,key) =>{
                      return(
                          <span className="itemList">
                          <span className="atributo">{val.CPF}</span>
                          <span className="atributo">{val.nome}</span>
                          <span className="atributo">{val.quantidade_cursos}</span>
                          </span>
                      );
                    })}
            </div>
        </div>
    )
}