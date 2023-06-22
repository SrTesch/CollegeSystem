import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Cadastros.css'

export default function Func(){
    const [funcs, setFuncs] = useState([]);
    
    useEffect(()=>{
        updateList();
    }, []);

    const updateList = () =>{
        Axios.get("http://localhost:3001/getFunc").then((response)=>{
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
        Axios.post("http://localhost:3001/cadastroFunc", {
            cpf: cpf,
            nome: nome,
            endereco: endereco,
            salário: salario,
            cod_setor: cod_setor
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
        Axios.delete("http://localhost:3001/deleteFunc", { data: { CPF: cpf } }).then(response =>{
            setDeleteMessage(true);
            console.log(response);
            setTimeout(()=>{setDeleteMessage(false); setCPF(''); setDeleteForm(false); updateList()}, 2500);
            
        })
    }

    const [cpf, setCPF] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [salario, setSalario] = useState(0);
    const [cod_setor, setCodSetor] = useState('');
    return(
        <div>
            <Link to="/" className="homeButton">voltar para menu</Link>
            <h1>FUNCIONÁRIOS</h1>
            <button className="AddNew" onClick={useShowForm}>Novo Funcionário</button>
            <button className="deleteItem" onClick={useDeleteForm}>Deletar</button>
            <button onClick={updateList} className="updateList">Atualizar</button>
            <div className="tableList">
                <span className="titleList">
                    <span className="atributo">
                        Nome
                    </span>
                    <span className="atributo">
                        Salário
                    </span>
                    <span className="atributo">
                        CPF
                    </span>
                </span>
                <hr />
                {deleteForm && (
                    <div className="formDelete">
                    <label>
                        Cpf do Funcionário que deseja remover:
                        <input type="text" 
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={deleteItem}>Remover</button>
                    {deleteMessage && (<span>Funcionário Deletado!!!</span>)}
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
                        Endereço:
                        <input type="text"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Salário:
                        <input type="number"
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Código do Setor:
                        <input type="number"
                            value={cod_setor}
                            onChange={(e) => setCodSetor(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={addNew}>Salvar</button>
                    {successMessage && (<span>Funcionário cadastrado!!!</span>)}
                    </div>
                )}
                {funcs.map((val,key) =>{
                    return(
                        <span className="itemList">
                        <span className="atributo">
                            {val.nome}
                        </span>
                        <span className="atributo">
                            {val.salário}
                        </span>
                        <span className="atributo">
                            {val.CPF}
                        </span>
                        <br />
                        </span>
                    );
                })}
            </div>
        </div>        
    )
}