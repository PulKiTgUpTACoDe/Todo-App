import { useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function App() {

  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false)
  
  let storeTodos = () => {
    localStorage.clear();
    localStorage.setItem("todo", JSON.stringify(Todos));
}

useEffect(() => {
    let todoString = localStorage.getItem("todo");
    if (todoString) {
        let todos = JSON.parse(todoString);
        setTodos(todos);
    }
}, [])

  let handleAdd = ()=>{
    if(Todo.trim() === ""){
      return
    }
    setTodos([...Todos, {Todo, isCompleted:false, key:uuidv4()}]),
    setTodo("")
    storeTodos();
  }

  let handleEdit = (e, id)=>{
    let t = Todos.filter((item)=>{
      return item.key === id;
  })
    setTodo(t[0].Todo);
  let newTodos = Todos.filter((item)=>{
    return item.key !== id
  })
  setTodos(newTodos);
  storeTodos();
  }

  let handleDelete = (e, id)=>{
    let newTodos = Todos.filter((item)=>{
      return item.key !== id
    })
    setTodos(newTodos);
    storeTodos();
  }

  let handleChange = (e)=>{
    setTodo(e.target.value);
  }

  let handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => {
        return item.key === id;
    });
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    storeTodos();
};

  let toggleFinished = ()=>{
    setShowFinished(!showFinished);
  }

  return (
    <>
    <Navbar/>
    <div className="container min-h-[80vh] bg-stone-800 mx-auto my-5 rounded-xl text-white p-5">
      <div className="addTodo space-y-3">
        <h2 className='font-bold relative left-4 md:left-0'>Add Your To-do work</h2>
        <div className="relative mt-2 rounded-md shadow-sm md:flex md:flex-row flex-col">
          <input
            onChange={handleChange}
            value={Todo}
            type="text"
            placeholder="Enter your Tasks"
            className="block md:w-1/2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6 bg-zinc-300 w-full h-6 md:h-8"
          />
          <button onClick={handleAdd} disabled={Todo.length<5} className='bg-red-700 hover:bg-red-800 p-2 py-1 text-sm font-bold rounded-md md:mx-3 md:w-28 disabled:bg-red-900 w-full mt-3 md:mt-0 h-7 md:h-8'>Save</button>
        </div>
      </div>
      <div className='relative top-12 flex gap-3 left-4 md:left-0'>
        <input type="checkbox" checked={showFinished} onChange={toggleFinished} /> Show finished tasks
      </div>

      {Todos.length === 0 && <div className="emptyMsg relative top-44 md:left-1/3 size-max md:text-4xl text-3xl left-5">No Tasks has been put on</div>}
      {Todos.map((item)=>{
        return (showFinished || !item.isCompleted) && <div key={item.key} className="Todos relative top-16 flex md:w-8/12 w-full bg-black md:h-20 h-14 rounded-xl justify-between items-center mb-2">
          <div className='md:p-5 flex pl-3'>
            <input type="checkbox" checked={item.isCompleted} className='mr-3' onChange={handleCheckbox} value={item.isCompleted} name={item.key}/>
            <p className={item.isCompleted?"line-through":""}>{item.Todo}</p>
          </div>
          <div className="buttons">
            <button onClick={(e)=>handleEdit(e, item.key)} className='bg-red-700 hover:bg-red-800 p-2 py-1 font-bold rounded-md mx-1 md:size-8 size-7 md:relative md:right-5'><FaRegEdit /></button>
            <button onClick={(e)=>handleDelete(e,item.key)} className='bg-red-700 hover:bg-red-800 p-2 py-1 font-bold rounded-md mx-2 md:size-8 size-7 md:relative md:right-5'><MdDeleteOutline /></button>
          </div>
        </div>
      })}

    </div>
    </>
  )
}

export default App
