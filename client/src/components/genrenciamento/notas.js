import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Cadastros.css'
import Axios from "axios";

export default function Notas(){
    const [notas, setMats] = useState([]);

    const [cod_disc, setCodDisc] = useState('');
    const [CPF_aluno, setCpfAluno] = useState('');
    const [nota, setNota] = useState('');

    useEffect(()=>{
        updateList();
    }, []);

    const updateList = () =>{
        Axios.get("http://localhost:3001/getNotas").then((response)=>{
          console.log(response.data);
          setMats(response.data);
        });
    }

    const [showForm, setShowForm] = useState(false);
    const useShowForm = () =>{
        setShowForm(true);
    }
    const [successMessage, setSuccessMessage] = useState(false);
    const addNew = (event) => {
 
        event.preventDefault();
        Axios.post("http://localhost:3001/lancarNota", {
            cod_disc: cod_disc,
            CPF_aluno: CPF_aluno,
            nota: nota
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
        Axios.delete("http://localhost:3001/deleteNota", { 
            data: { 
            cod_disc: cod_disc,
            CPF_aluno: CPF_aluno,
            nota: nota
        }}).then(response =>{
            setDeleteMessage(true);
            console.log(response);
            setTimeout(()=>{setDeleteMessage(false); setCodDisc('');
            setCpfAluno(''); setNota('');
            setDeleteForm(false); updateList()
            }, 2500);
            
        })
    }

    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>Notas</h1>
            <div className="buttonsAddDelete">
                <button className="AddNew" onClick={useShowForm}>Lançar Nota</button>
                <button className="deleteItem" onClick={useDeleteForm}>Excluir</button>
            </div>
            <div className="tableList">
                <span className="titleList">
                    <span className="atributo">
                        Disciplina
                    </span>
                    <span className="atributo">
                        Aluno
                    </span>
                    <span className="atributo">
                        Nota
                    </span>
                </span>
                <hr />
                {deleteForm && (
                    <div className="formDelete">
                        <form onSubmit={deleteItem}>
                            <button className="closePopUp" onClick={e=>{setDeleteForm(false)}}>X</button>
                            <h1 className="formtitle" style={{marginBottom: '15px'}}>Remoção</h1>
                            CPF do aluno:
                            <input type="text"
                                value={CPF_aluno}
                                onChange={(e) => setCpfAluno(e.target.value)}
                                required
                            />
                            <br />
                            Código da Disciplina que deseja remover:
                            <input type="text"
                                value={cod_disc}
                                onChange={(e) => setCodDisc(e.target.value)}
                                required
                            />
                            Nota:
                            <input type="number"
                                value={nota}
                                onChange={(e) => setNota(e.target.value)}
                                required
                            />
                            <button className="submiting" type="submit">Remover</button>
                            {deleteMessage && (<span className="confirmation">Nota excluida!!!</span>)}
                        </form>
                    </div>
                )}
            {showForm && (
                    <div className="formAdd">
                        <button className="closePopUp" onClick={e=>{setShowForm(false)}}>X</button>
                        <h1 className="formtitle" style={{marginBottom: '15px'}}>Lançamento</h1>
                        <form onSubmit={addNew}>
                            <br />
                            Código da Disciplina:
                            <input type="text"
                                value={cod_disc}
                                onChange={(e) => setCodDisc(e.target.value)}
                                required
                            />
                            CPF do Aluno:
                            <input type="text"
                                value={CPF_aluno}
                                onChange={(e) => setCpfAluno(e.target.value)}
                                required
                            />
                            Nota:
                            <input type="number"
                                value={nota}
                                onChange={(e) => setNota(e.target.value)}
                                required
                            />
                            <button className="submiting" type="submit">Salvar</button>
                            {successMessage && (<span className="confirmation">Nota Lançada!!!</span>)}
                        </form>
                    </div>
                )}
            {notas.map((val,key) =>{
                return(
                    <span className="itemList">
                        <span className="atributo">{val.disciplina_nome}</span>
                        <span className="atributo">{val.aluno_nome}</span>
                        <span className="atributo">{val.nota}</span>
                    </span>
                );
            })}
            </div>
        </div>
    )
}