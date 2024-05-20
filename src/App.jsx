import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';



function App() {
  const [todo, setTodo] = useState("")
  const [todos,setTodos] = useState([]);

  const [showFinished, setshowFinished] = useState(true)

  const toggle  = () => {
  setshowFinished(!showFinished)
  }

  useEffect(() => {
    let todositems = localStorage.getItem("todos")
    if(todositems){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const savetoLS = () =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos , {id: uuidv4() ,todo , isCompleted:false}])
    setTodo("")
    savetoLS()
  }
  
  const handleEdit = (e) => {
    let id = e.target.name;
    let t = todos.filter(item=>{
      return item.id === id;
    })
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    savetoLS()
  }
  
  const handleDelete = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })

    let newTodos = [...todos]
    newTodos.splice(index,1);
    setTodos(newTodos);
    savetoLS()

  }
  
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    }
  )
  let newTodos = [...todos]
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos);
  savetoLS()
  }
  // const disable =()=>{
  //   if(todo.length<3){
  //     alert("Empty Todo is not valid")
  //   }
  // }



  return (
    <>
     <Navbar/>
     <div className='container min-h-[80vh] p-5 bg-pink-200 rounded-[20px] m-auto my-9 w-1/2'>
      <h1 className='text-center font-bold text-3xl'>YourTodos - Important to do these Task</h1>
        <div className="addTodo my-8">
          <h1 className='font-bold text-lg my-5 '>Add a Todo</h1>
          <div className='flex flex-col gap-3'>
          <input onChange ={handleChange } value = {todo} type="text" className='w-full border-black rounded-full py-1 px-5' />
          <button onClick={handleAdd} disabled ={todo.length < 3 } className='bg-red-400 p-2 py-1 font-bold text-sm hover:bg-red-700 rounded-md'>Save</button>
        </div>
        </div>
        <input onChange={toggle} type="checkbox" checked = {showFinished} /> Show Finished
          <h2 className='text-xl font-bold text-gray-900 my-2'>Your Todos</h2>
        <div className='todos'>
        { todos.length === 0 && <div>No Todo items</div> }
          {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div  key={item.id} className='todo flex w-1/2 justify-between items-center my-3'>
              <div className='flex gap-5'>
              <input type="checkbox" name={item.id } id=""  checked={item.isCompleted} onChange={handleCheckbox} />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className='buttons my-1 flex h-full '>
            <button onClick={handleEdit} name={item.id} className='bg-blue-400 p-2 py-1 font-semibold  text-sm mx-3 hover:bg-blue-600 rounded-md'>Edit</button>
            <button onClick={handleDelete} name={item.id} className='bg-blue-400 p-2 py-1 font-semibold   text-sm mx-3 hover:bg-blue-600 rounded-md'>Delete</button>
            </div>
            </div>
            
          })}
        </div>
     </div>
    </>
  )
}

export default App
