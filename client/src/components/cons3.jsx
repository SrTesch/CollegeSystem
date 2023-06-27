import React, { useState } from "react";
import Axios from 'axios';
import { useEffect } from "react";

export default function Cons3({ setRenderCon }) {
    const [cursos, setCursos] = useState([]);

    useEffect(()=>{
        updateList();
    }, []);
    
    const updateList = () =>{
        Axios.get("http://localhost:3001/getMediaSalarial").then((response)=>{
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
                    <span className="atributo">Código Do Curso</span>
                    <span className="atributo">Media Salarial dos Professores</span>
                </div>
                    <hr />
                    {cursos.map((val,key) =>{
                      return(
                          <span className="itemList">
                          <span className="atributo">{val.cod_curso}</span>
                          <span className="atributo">{val.media_salarial}</span>
                          </span>
                      );
                    })}
            </div>
        </div>
    )
}