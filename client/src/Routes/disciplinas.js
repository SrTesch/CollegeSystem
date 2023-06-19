import React , { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Cadastros.css'

export default function Disciplinas(){
    const [disc, setDisc] = useState([]);

    const updateList = () =>{
        Axios.get("http://localhost:3001/getDisc").then((response)=>{
          console.log(response.data);
          console.log("passei no updateList");
          setDisc(response.data);
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
            <h1>DISCIPLINAS</h1>
            <button className="AddNew" onClick={addNew}>Nova Disciplina</button>
            <button onClick={updateList} className="updateList">Atualizar</button>
            <div className="tableList">
                {disc.map((val,key) =>{
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