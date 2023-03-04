import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState([])

  function addTodo(e){
    e.preventDefault()
    if(input === "") return
    let tmp = [...todos, 
      {
        value: input,
        completed: false
      }
   ]
    setTodos(tmp)
    setInput("")
    localStorage.setItem("todo", JSON.stringify(tmp))
  }

  function deleteTodo(index){
    let tmp = todos.filter((item, id)=> id!=index)
    setTodos([...tmp])
    localStorage.setItem("todo", JSON.stringify(tmp))
  }

  function markTodo(index){
    let tmp = todos
    tmp[index].completed = !tmp[index].completed
    setTodos([...todos])
    localStorage.setItem("todo", JSON.stringify(tmp))
  }

  useEffect(()=>{
    let tmp = localStorage.getItem("todo") || "[]"
    tmp = JSON.parse(tmp)
    setTodos([...tmp])
  },[])
  

  return (
    <div className="App">
      <h3>Todo App</h3>
      <form onSubmit={addTodo}>
      <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" />
      <button>Add</button>
      </form>
      <ul>
        {todos&&todos.map((item, index)=> <li key={index}>
          <div>
            {item.completed ? <strike>{item.value}</strike> : <span>{item.value}</span>}
            </div>
          <div className='btns'>
            <button className='delete' onClick={() => deleteTodo(index)}>Delete</button>
            <button className='done' onClick={() => markTodo(index)}>
            {item.completed ? <span>Redo</span> : <span>Done</span>}
            </button>
          </div>
        </li>)}
      </ul>
    </div>
  )
}

export default App
