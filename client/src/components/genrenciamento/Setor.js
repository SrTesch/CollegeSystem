import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Cadastros.css'
import Axios from "axios";

export default function Setor(){
    const [setores, setSetores] = useState([]);
    
    useEffect(()=>{
        updateList();
    }, []);

    const updateList = () =>{
        Axios.get("http://localhost:3001/getSetores").then((response)=>{
          console.log(response.data);
          setSetores(response.data);
        });
    }

    const [showForm, setShowForm] = useState(false);
    const useShowForm = () =>{
        setShowForm(true);
    }
    const [successMessage, setSuccessMessage] = useState(false);
    const addNew = (event) => {
 
        event.preventDefault();
        Axios.post("http://localhost:3001/cadastroSetor", {
            cod_setor: cod_setor,
            nome: nome
          }).then(response =>{
            console.log(response);
            setSuccessMessage(true);
            setTimeout(()=>{setSuccessMessage(false); setShowForm(false); updateList()}, 2500);
        })
    }

    const [deleteForm, setDeleteForm] = useState(false);
    
    const useDeleteForm = () =>{
        setDeleteForm(true);
    }

    const [deleteMessage, setDeleteMessage] = useState(false);
    const deleteItem = (e) =>{
        e.preventDefault();
        Axios.delete("http://localhost:3001/deleteSetor", { data: { cod_setor: cod_setor } }).then(response =>{
            setDeleteMessage(true);
            console.log(response);
            setTimeout(()=>{setDeleteMessage(false); setCodSetor(''); setDeleteForm(false); updateList()}, 2500);
            
        })
    }

    const [cod_setor, setCodSetor] = useState('');
    const [nome, setNome] = useState('');

    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>SETORES</h1>
            <button className="AddNew" onClick={useShowForm}>Novo Setor</button>
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
                </span>
                <hr />
                {deleteForm && (
                    <div className="formDelete">
                    <label>
                        Código do Setor que deseja remover:
                        <input type="text" 
                            value={cod_setor}
                            onChange={(e) => setCodSetor(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={deleteItem}>Remover</button>
                    {deleteMessage && (<span>Setor Deletado!!!</span>)}
                    </div>
                )}
            {showForm && (
                    <div className="formAdd">
                    <label>
                        Código do setor:
                        <input type="text" 
                            value={cod_setor}
                            onChange={(e) => setCodSetor(e.target.value)}
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
                    <button onClick={addNew}>Salvar</button>
                    {successMessage && (<span>Setor cadastrado!!!</span>)}
                    </div>
                )}
            {setores.map((val,key) =>{
                return(
                    <span className="itemList">
                        <span className="atributo">{val.cod_setor}</span>
                        <span className="atributo">{val.nome}</span>
                    </span>
                );
            })}
            </div>
        </div>
    )
}