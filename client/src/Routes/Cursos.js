import {React, useState} from "react";
import { Link } from "react-router-dom";
import './Cadastros.css'
import Axios from "axios";
export default function Cursos(){
    const [cursos, setCursos] = useState([]);

    const updateList = () =>{
        Axios.get("http://localhost:3001/getCursos").then((response)=>{
          console.log(response.data);
          setCursos(response.data);
        });
    }
    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>CURSOS</h1>
            <button className="AddNew">Novo Curso</button>
            <button onClick={updateList} className="updateList">Atualizar</button>
            {cursos.map((val,key) =>{
                return(
                    <div className="tableList">
                    <span className="itemList">
                    {val.nome} <br />
                    </span>
                    <hr />
                    </div>
                );
            })}
        </div>
    )
}