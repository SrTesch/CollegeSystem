import {React, useEffect, useState} from "react";
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

    useEffect(()=>{
        updateList();
    }, []);

    const [showForm, setShowForm] = useState(false);
    const useShowForm = () =>{
        setShowForm(true);
    }
    const [successMessage, setSuccessMessage] = useState(false);
    const addNew = (event) => {
 
        event.preventDefault();
        Axios.post("http://localhost:3001/cadastroCurso", {
            cod_curso: cod_curso,
            nome: nome,
            ano_inicio: ano_inicio
          }).then(response =>{
            console.log(response);
            setSuccessMessage(true);
            setTimeout(()=>{setSuccessMessage(false); setShowForm(false); updateList(); setCodCurso('')}, 2500);
        })
    }

    const [deleteForm, setDeleteForm] = useState(false);
    
    const useDeleteForm = () =>{
        setDeleteForm(true);
    }

    const [deleteMessage, setDeleteMessage] = useState(false);
    const deleteItem = (e) =>{
        e.preventDefault();
        Axios.delete("http://localhost:3001/deleteCurso", { data: { cod_curso: cod_curso } }).then(response =>{
            setDeleteMessage(true);
            console.log(response);
            setTimeout(()=>{setDeleteMessage(false); setCodCurso(''); setDeleteForm(false); updateList()}, 2500);
            
        })
    }

    const [cod_curso, setCodCurso] = useState('');
    const [nome, setNome] = useState('');
    const [ano_inicio, setAnoInicio] = useState(0);

    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>CURSOS</h1>
            <button className="AddNew" onClick={useShowForm}>Novo Curso</button>
            <button className="deleteItem" onClick={useDeleteForm}>Deletar</button>
            <button onClick={updateList} className="updateList">Atualizar</button>
            <div className="tableList">
            <span className="titleList">
                <span className="atributo">
                    Código
                </span>
                <span className="atributo">
                    Nome
                </span>
                <span className="atributo">
                    Ano_inicio
                </span>
            </span>
            <hr />
            {deleteForm && (
                    <div className="formDelete">
                    <label>
                        Código do curso que deseja remover:
                        <input type="text" 
                            value={cod_curso}
                            onChange={(e) => setCodCurso(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={deleteItem}>Remover</button>
                    {deleteMessage && (<span>Curso Deletado!!!</span>)}
                    </div>
                )}
            {showForm && (
                    <div className="formAdd">
                    <label>
                        Código do Curso:
                        <input type="text" 
                            value={cod_curso}
                            onChange={(e) => setCodCurso(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Nome:
                        <input type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Ano de início:
                        <input type="number"
                            value={ano_inicio}
                            onChange={(e) => setAnoInicio(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={addNew}>Salvar</button>
                    {successMessage && (<span>Curso cadastrado!!!</span>)}
                    </div>
                )}
            {cursos.map((val,key) =>{
                return(
                    <span className="itemList">
                    <span className="atributo">{val.cod_curso}</span>
                    <span className="atributo">{val.nome}</span>
                    <span className="atributo">{val.ano_inicio}</span>
                    </span>
                );
            })}
            </div>
        </div>
    )
}