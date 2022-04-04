import React, { useState, useRef }  from 'react'
import { AgGridReact } from 'ag-grid-react';
import Button from'@mui/material/Button';
import {Delete} from '@mui/icons-material'
import TextField from'@mui/material/TextField';
import Stack from'@mui/material/Stack';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';



function App() {
  const [todo, setTodo] = useState({desc: '',  priority: ''});
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('one');
  const gridRef = useRef();
  const handleChange = (event, value) => {  setValue(value);};
  const [selectedDate, handleDateChange] = useState(new Date());
  

  const addTodo = (event) => {
    setTodos([...todos, todo]);
    todo.date=selectedDate.toLocaleDateString();
    setTodo({desc: '',  priority: ''});
  }

  const deleteTodo = () => {  
    setTodos(todos.filter((todo, index) =>      
    index !== gridRef.current.getSelectedNodes()[0].childIndex))}

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  } 

  const columns = [
    { field: 'desc', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'priority', sortable: true, filter: true },
  ]

  return (
    <div className="App">
      
    <Tabs value={value}onChange={handleChange}>
        <Tab value="one"label="Home" />
        <Tab value="two"label="Todos" />
    </Tabs>
    {value === 'one' && <div><h1>Tervetuloa!<br></br> Todo-appi löytyy TODOS tabista</h1></div>}   
    {value === 'two' && <div>

    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <TextField
        label="Description" variant="standard" name="desc" value={todo.desc} onChange={inputChanged}/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
        label="Date" variant="standard" name="date" value={selectedDate} format='dd-MM-yyyy' onChange={handleDateChange}/>
        </MuiPickersUtilsProvider>
        <TextField
        label="Priority" variant="standard" name="priority" value={todo.priority} onChange={inputChanged}/>

          <Button onClick={addTodo} variant="outlined" >Add</Button>
          <Button onClick={deleteTodo} variant="outlined" color="error" startIcon={<Delete/>} >Delete</Button>
      </Stack>

  <div className="ag-theme-material" style={{height: 400, width: 600, margin: 'auto'}}>
    <AgGridReact
    ref={gridRef}
    onGridReady={ params => gridRef.current = params.api }
    rowSelection="single"
     rowData={todos}
    columnDefs={columns}>
    </AgGridReact>
    </div>
    </div>}   
 
    </div>
    
    );

  
}

export default App;
