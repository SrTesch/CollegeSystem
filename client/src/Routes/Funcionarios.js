import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Cadastros.css'

export default function Func(){
    const [funcs, setFuncs] = useState([]);

    const updateList = () =>{
        Axios.get("http://localhost:3001/getFunc").then((response)=>{
          console.log(response.data);
          setFuncs(response.data);
        });
    }
    const addNew = () =>{
        
    }
        /*Axios.get("http://localhost:3001/getFunc").then((response)=>{
          console.log(response.data);
          //setEmployeeList(response.data);
        });*/
    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>FUNCIONÁRIOS</h1>
            <button className="AddNew" onClick={addNew}>Novo Funcionário</button>
            <button onClick={updateList} className="updateList">Atualizar</button>
            <div className="tableList">
                <h1>teste</h1>
            {funcs.map((val,key) =>{
                return(
                    <span className="itemList">
                    {val.nome} <br />
                    </span>
                    );
                })}
            </div>
        </div>        
    )
}