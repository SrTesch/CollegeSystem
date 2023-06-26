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
            <div className="buttonsAddDelete">
                <button className="AddNew" onClick={useShowForm}>Novo Setor</button>
                <button className="deleteItem" onClick={useDeleteForm}>Deletar</button>
            </div>
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
                        <form onSubmit={deleteItem}>
                            <button className="closePopUp" onClick={e=>{setDeleteForm(false)}}>X</button>
                            <h1 className="formtitle" style={{marginBottom: '15px'}}>Deleção</h1>
                            <br />
                            Código do Setor que deseja remover:
                            <input type="text"
                                value={cod_setor}
                                onChange={(e) => setCodSetor(e.target.value)}
                                required
                            />
                            <button className="submiting" type="submit">Remover</button>
                            {deleteMessage && (<span className="confirmation">Setor Deletado!!!</span>)}
                        </form>
                    </div>
                )}
            {showForm && (
                    <div className="formAdd">
                        <button className="closePopUp" onClick={e=>{setShowForm(false)}}>X</button>
                        <h1 className="formtitle" style={{marginBottom: '15px'}}>Cadastro</h1>
                        <form onSubmit={addNew}>
                            <br />
                            Código do setor:
                            <input type="text"
                                value={cod_setor}
                                onChange={(e) => setCodSetor(e.target.value)}
                                required
                            />
                            Nome:
                            <input type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                            <button className="submiting" type="submit">Salvar</button>
                            {successMessage && (<span className="confirmation">Setor cadastrado!!!</span>)}
                        </form>
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