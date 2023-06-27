import React, { useState } from "react";
import Axios from 'axios';
import { useEffect } from "react";

export default function Cons1({ setRenderCon }) {
    const [turmas, setTurmas] = useState([]);

    useEffect(()=>{
        updateList();
    }, []);
    
    const updateList = () =>{
        Axios.get("http://localhost:3001/getTurmasAlunos").then((response)=>{
          console.log(response.data)
          console.log('works')
          const data = response.data;
          const sortedData = data.sort((a, b) => b.num_alunos - a.num_alunos);
          setTurmas(sortedData);
        });
    }
    return(
        <div className="popUpCons">
            <button className="closePopUp" onClick={e=>{setRenderCon(false)}}>X</button>
            <h1 style={{color:"white"}}>Turmas</h1>
            <div className="tableList">
                <div className="titleList">
                    <span className="atributo">Turma</span>
                    <span className="atributo">Quantidade de alunos</span>
                </div>
                    <hr />
                    {turmas.map((val,key) =>{
                    return(
                        <span className="itemList">
                        {/* <span className="atributo">{val.cod_disc}</span> */}
                        <span className="atributo">{val.disciplina_nome}</span>
                        <span className="atributo">{val.num_alunos}</span>
                        </span>
                    );
                    })}
            </div>
        </div>
    )
}