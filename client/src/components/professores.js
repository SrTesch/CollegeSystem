import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Cadastros.css'

export default function Professores(){
    const [funcs, setFuncs] = useState([]);
    
    useEffect(()=>{
        updateList();
    }, []);

    const updateList = () =>{
        Axios.get("http://localhost:3001/getProf").then((response)=>{
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
        Axios.post("http://localhost:3001/cadastroProf", {
            cpf: cpf,
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            data_contratacao: data_contratacao,
            salario: salario,
            ativo: ativo,
            cod_curso: cod_curso
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
        Axios.delete("http://localhost:3001/deleteProf", { data: { CPF: cpf } }).then(response =>{
            setDeleteMessage(true);
            console.log(response);
            setTimeout(()=>{setDeleteMessage(false); setCPF(''); setDeleteForm(false); updateList()}, 2500);
            
        })
    }

    const [cpf, setCPF] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone]= useState('');
    const [endereco, setEndereco] = useState('');
    const [data_contratacao, setDataContratacao] = useState('');
    const [salario, setSalario] = useState(0);
    const [ativo, setAtivo] = useState(true);
    const [cod_curso, setCodCurso] = useState('');
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
                        Data De Contratação
                    </span>
                    <span className="atributo">
                        Salário
                    </span>
                    <span className="atributo">
                        Ativo
                    </span>
                    <span className="atributo">
                        Curso
                    </span>
                </span>
                <hr />
                {deleteForm && (
                    <div className="formDelete">
                    <label>
                        Cpf do Professor que deseja remover:
                        <input type="text" 
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={deleteItem}>Remover</button>
                    {deleteMessage && (<span>Professor Deletado!!!</span>)}
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
                        Data de Contratação:
                        <input type="date"
                            value={data_contratacao}
                            onChange={(e) => setDataContratacao(e.target.value)}
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
                        Ativo:
                        <input type="boolean"
                            value={ativo}
                            onChange={(e) => setAtivo(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Código do Curso:
                        <input type="number"
                            value={cod_curso}
                            onChange={(e) => setCodCurso(e.target.value)}
                            required
                        />
                    </label>
                    <button onClick={addNew}>Salvar</button>
                    {successMessage && (<span>Professor cadastrado!!!</span>)}
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