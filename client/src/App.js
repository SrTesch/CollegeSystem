//import { useState } from 'react';
import './App.css';
//import Axios from 'axios';
import Rotas from './Routes/routes';


function App() {
  //const [message, setMessage] = useState(false);
  //const [employeeList, setEmployeeList] = useState([]);


  /*const addEmployee = () => {

    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      salary : salary
    }).then((response)=>{
      console.log("Success to insert the employee information into your database!");
      setMessage(true);
      setTimeout(()=>{setMessage(false)}, 2500);
      console.log(response)
    });
  }

  const getEmployees = () =>{
    Axios.get("http://localhost:3001/employees").then((response)=>{
      console.log(response.data);
      setEmployeeList(response.data);
    });
  };
*/

/*<button>Add Employee</button>
        {message && (<span>Funcionário cadastrado!!!</span>)}
      <hr/>

      <div className='showEmployees'>
        <button onClick={getEmployees} style={{marginBottom:"10px"}}>Show All Employees</button>
        {employeeList.map((val,key) =>{
          return(
            <div>
              {val.name}: {val.position} <br />
              Age: {val.age} / R${val.Salary} <br /> 
              <hr />
            </div>
          )
        })}
      </div>*/
  return (
    <div className="App">
        <Rotas />
    </div>
  );
}

export default App;
