import { useState } from 'react';
import './App.css';
import Axios from 'axios'


function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState(0);

  const [message, setMessage] = useState(false);
  //const [employeeList, setEmployeeList] = useState([]);


  const addEmployee = () => {

    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      salary : salary
    }).then(()=>{
      console.log("Success to insert the employee information into your database!");
      setMessage(true);
      setTimeout(()=>{setMessage(false)}, 2500);
    });
  }

  const getEmployees = () =>{
    Axios.get("http://localhost:3001/employees").then((response)=>{
      console.log(response);
    });
  };


  return (
    <div className="App">
      <div className='information'>
        <label>
          Name:
        </label>
        <input type='text'
          id = "nome"
          value={name}
          onChange={e=>setName(e.target.value)}
        />
        
        
        <label>
          Age:
        </label>
        <input type='number'
          value={age}
          onChange={e=>setAge(e.target.value)}
        />


        <label>
          Country:
        </label>
        <input type='text'
          value={country}
          onChange={e=>setCountry(e.target.value)}
        />
        
        
        <label>
          Position:
        </label>
        <input type='text'
          value={position}
          onChange={e=>setPosition(e.target.value)}
        />
        
        
        <label>
          Salary/year:
        </label>
        <input type='number'
          value={salary}
          onChange={e=>setSalary(e.target.value)}
        />


        <button onClick={addEmployee}>Add Employee</button>
        {message && (<span>Funcionário cadastrado!!!</span>)}
      </div>
      <hr/>

      <div className='showEmployees'>
        <button onClick={getEmployees}>Show All Employees</button>
      </div>
    </div>
  );
}

export default App;
