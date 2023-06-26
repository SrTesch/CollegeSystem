import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Cadastros.css'

export default function Alunos(){
    const [funcs, setFuncs] = useState([]);
    
    useEffect(()=>{
        updateList();
    }, []);

    const updateList = () =>{
        Axios.get("http://localhost:3001/getAlum").then((response)=>{
          console.log(response.data);
          console.log("passei no updateList");
          setFuncs(response.data);
        });
    }

    const [showForm, setShowForm] = useState(false);
    const useShowForm = () =>{
        setShowForm(true);
    }
    const [successMessage, setSuccessMessage] = useState(false);
    const addNew = (event) => {
        
        event.preventDefault();
        Axios.post("http://localhost:3001/cadastroAlum", {
            cpf: cpf,
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            ativo: ativo,
          }).then(response =>{
            console.log(response);
            setSuccessMessage(true);
            setTimeout(()=>{setSuccessMessage(false); setShowForm(false); setCPF(''); updateList()}, 2500);
        })
    }

    const [deleteForm, setDeleteForm] = useState(false);
    
    const useDeleteForm = () =>{
        setDeleteForm(true);
    }

    const [deleteMessage, setDeleteMessage] = useState(false);
    const deleteItem = (e) =>{
        e.preventDefault();
        Axios.delete("http://localhost:3001/deleteAlum", { data: { CPF: cpf } }).then(response =>{
            setDeleteMessage(true);
            console.log(response);
            setTimeout(()=>{setDeleteMessage(false); setCPF(''); setDeleteForm(false); updateList()}, 2500);
            
        })
    }

    const [cpf, setCPF] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone]= useState('');
    const [endereco, setEndereco] = useState('');
    const [ativo, setAtivo] = useState(true);
    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>PROFESSORES</h1>
            <button className="AddNew" onClick={useShowForm}>Novo Professor</button>
            <button className="deleteItem" onClick={useDeleteForm}>Deletar</button>
            <button onClick={updateList} className="updateList">Atualizar</button>
            <div className="tableList">
                <span className="titleList">
                    <span className="atributo">
                        CPF
                    </span>
                    <span className="atributo">
                        Nome
                    </span>
                    <span className="atributo">
                        Telefone
                    </span>
                    <span className="atributo">
                        Endereço
                    </span>
                    <span className="atributo">
                        Ativo
                    </span>
                </span>
                <hr />
                {deleteForm && (
                    <div className="formDelete">
                    <label>
                        Cpf do Aluno que deseja remover:
                        <input type="text" 
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={deleteItem}>Remover</button>
                    {deleteMessage && (<span>Aluno Deletado!!!</span>)}
                    </div>
                )}
                {showForm && (
                    <div className="formAdd">
                    <label>
                        CPF:
                        <input type="text" 
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)}
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
                        Telefone:
                        <input type="text"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Endereço:
                        <input type="text"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Ativo:
                        <input type="boolean"
                            value={ativo}
                            onChange={(e) => setAtivo(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={addNew}>Salvar</button>
                    {successMessage && (<span>Aluno cadastrado!!!</span>)}
                    </div>
                )}
                {funcs.map((val,key) =>{
                    return(
                        <span className="itemList">
                        <span className="atributo">
                            {val.CPF}
                        </span>
                        <span className="atributo">
                            {val.nome}
                        </span>
                        <span className="atributo">
                            {val.telefone}
                        </span>

                        <span className="atributo">
                            {val.endereco}
                        </span>
                        <span className="atributo">
                            {val.ativo}
                        </span>
                        <br />
                        </span>
                    );
                })}
            </div>
        </div>        
    )
}