import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Cadastros.css'
import Axios from "axios";

export default function Setor(){
    const [setores, setSetores] = useState([]);

    const updateList = () =>{
        Axios.get("http://localhost:3001/getSetores").then((response)=>{
          console.log(response.data);
          setSetores(response.data);
        });
    }
    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>SETORES</h1>
            <button className="AddNew">Novo Setor</button>
            <button onClick={updateList} className="updateList">Atualizar</button>
            {setores.map((val,key) =>{
                return(
                    <div className="tableList">
                    <span className="itemList">
                        {val.nome}
                    </span>
                    <hr />
                    </div>
                );
            })}
        </div>
    )
}