import React , { useState , useEffect } from "react";
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
        Axios.post("http://localhost:3001/cadastroDisc", {
            cod_disc: cod_disc,
            nome: nome,
            CPF_prof: cpf_prof
          }).then(response =>{
            console.log(response);
            setSuccessMessage(true);
            setTimeout(()=>{setSuccessMessage(false); setShowForm(false)}, 2500);
            setCodDisc('');
            setCpfProf('');
            setNome('');
        })
    }
    
    const [deleteForm, setDeleteForm] = useState(false);
    
    const useDeleteForm = () =>{
        setDeleteForm(true);
    }

    const [deleteMessage, setDeleteMessage] = useState(false);
    const deleteItem = (e) =>{
        e.preventDefault();
        Axios.delete("http://localhost:3001/deleteDisc", { data: { cod_disc: cod_disc } }).then(response =>{
            setDeleteMessage(true);
            console.log(response);
            setTimeout(()=>{setDeleteMessage(false); setCodDisc(''); setDeleteForm(false); updateList()}, 2500);
            
        })
    }

    const [cod_disc, setCodDisc] = useState('');
    const [nome, setNome] = useState('');
    const [cpf_prof, setCpfProf] = useState('');

    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>DISCIPLINAS</h1>
            <button className="AddNew" onClick={useShowForm}>Nova Disciplina</button>
            <button onClick={useDeleteForm} className="deleteItem">Deletar</button>
            <button onClick={updateList} className="updateList">Atualizar</button>
            <div className="tableList">
                <span className="titleList">
                    <span className="atributo">Código</span>
                    <span className="atributo">Nome</span>
                    <span className="atributo"> Prof Responsável</span>
                </span>
                <hr />
                {deleteForm && (
                    <div className="formDelete">
                    <label>
                        Código do Disciplina que deseja remover:
                        <input type="text" 
                            value={cod_disc}
                            onChange={(e) => setCodDisc(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={deleteItem}>Remover</button>
                    {deleteMessage && (<span>Disciplina Deletada!!!</span>)}
                    </div>
                )}
                {showForm && (
                    <div className="formAdd">
                    <label>
                        Código da Disciplina:
                        <input type="text" 
                            value={cod_disc}
                            onChange={(e) => setCodDisc(e.target.value)}
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
                        Cpf do Prof:
                        <input type="number"
                            value={cpf_prof}
                            onChange={(e) => setCpfProf(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={addNew}>Salvar</button>
                    {successMessage && (<span>Disciplina cadastrada!!!</span>)}
                    </div>
                )}
                {disc.map((val,key) =>{
                    return(
                        <span className="itemList">
                        <span className="atributo">{val.cod_disc}</span>
                        <span className="atributo">{val.nome}</span>
                        <span className="atributo">{val.CPF_prof}</span>
                        </span>
                    );
                })}
            </div>
        </div>        
    )
}