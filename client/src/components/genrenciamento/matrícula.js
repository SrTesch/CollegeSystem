import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Cadastros.css'
import Axios from "axios";

export default function Matricula(){
    const [mats, setMats] = useState([]);

    const [cod_disc, setCodDisc] = useState('');
    const [CPF_aluno, setCpfAluno] = useState('');
    const [data_inicio, setDataInicio] = useState('');

    useEffect(()=>{
        updateList();
    }, []);

    const changeDate = (date) =>{
        let dateObj = new Date(date);
        let formattedDate = dateObj.toLocaleDateString();
        return formattedDate;
    }

    const updateList = () =>{
        Axios.get("http://localhost:3001/getMat").then((response)=>{
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
        Axios.post("http://localhost:3001/cadastroMat", {
            cod_disc: cod_disc,
            CPF_aluno: CPF_aluno,
            data_inicio: data_inicio
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
        Axios.delete("http://localhost:3001/deleteMat", { 
            data: { 
            cod_disc: cod_disc,
            CPF_aluno: CPF_aluno
        }}).then(response =>{
            setDeleteMessage(true);
            console.log(response);
            setTimeout(()=>{setDeleteMessage(false); setCodDisc('');
            setCpfAluno(''); setDataInicio('');
            setDeleteForm(false); updateList()
            }, 2500);
            
        })
    }

    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>Matrícula</h1>
            <div className="buttonsAddDelete">
                <button className="AddNew" onClick={useShowForm}>Nova Matrícula</button>
                <button className="deleteItem" onClick={useDeleteForm}>Remover</button>
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
                        Data De Inicio
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
                            Código da matricula que deseja remover:
                            <input type="text"
                                value={cod_disc}
                                onChange={(e) => setCodDisc(e.target.value)}
                                required
                            />
                            <button className="submiting" type="submit">Remover</button>
                            {deleteMessage && (<span className="confirmation">Matrícula Removida!!!</span>)}
                        </form>
                    </div>
                )}
            {showForm && (
                    <div className="formAdd">
                        <button className="closePopUp" onClick={e=>{setShowForm(false)}}>X</button>
                        <h1 className="formtitle" style={{marginBottom: '15px'}}>Cadastro</h1>
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
                            Data de início:
                            <input type="date"
                                value={data_inicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                                required
                            />
                            <button className="submiting" type="submit">Salvar</button>
                            {successMessage && (<span className="confirmation">Matrícula cadastrada!!!</span>)}
                        </form>
                    </div>
                )}
            {mats.map((val,key) =>{
                val.data_inicio = changeDate(val.data_inicio);
                return(
                    <span className="itemList">
                        <span className="atributo">{val.disciplina_nome}</span>
                        <span className="atributo">{val.aluno_nome}</span>
                        <span className="atributo">{val.data_inicio}</span>
                    </span>
                );
            })}
            </div>
        </div>
    )
}