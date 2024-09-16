import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [active, setActive] = useState(false)


  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos')
      const result = (response.data)
      setTodos(result)

    } catch (error) {
      console.log('Not found');
    }

  }

  const completed = async id => {
    try {
      const response = await axios.get("http://localhost:3000/todo/completed/" + id)
      const result = response.data
      setTodos(todos => todos.map(todo => {
        if (todo._id === result._id) {
          todo.completed = result.completed
        }
        return todo
      }))
    } catch (error) {
      console.log('Not found');
    }
  }
  const deleteTodo = async id => {
    try {
      const response = await axios.delete("http://localhost:3000/todo/delete/" + id, { method: "DELETE" })
      const result = response.data
      console.log(result);
      setTodos(todos => todos.filter(todo => todo._id != result._id
      ))
    } catch (error) {
      console.log('Not found');
    }
  }

  const newTodo = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:3000/todo/new", {
      text: todo
    })
    const newTodo = response.data;
    console.log(newTodo);
    if(newTodo){
      setTodos([...todos, newTodo]);
      setTodo("");
      setActive(false)
    }else{
      alert("Please insert text")
    }


  }
  useEffect(() => {
    getTodos()

  }, [])
  return (
    <>

      <div className="app w-[100vw]  h-[100vh] flex flex-col justify-start items-center ">
        <div className='lg:bg-black/10 lg:px-10 h-full'>
        <h1 className='text-[28px] text-[#000000] font-bold mt-10 '>Welcome, Enigma</h1>
        <h4 className='text-[18px] font-bold text-[#494848] mt-4 mb-2 mr-[180px]'>YOUR TASKS</h4>

        <div className='flex flex-col justify-center items-center gap-2 transition-transform'>
          {todos.map(todo => (
            <div className="todos bg-[#0f0f0f] w-[300px] h-14 rounded-[10px] flex flex-row justify-around items-center hover:opacity-80 shadow-md shadow-[#4b4d4a]" key={todo._id}>
              <div className={
                `checkbox cursor-pointer rounded-full w-5 h-5 ${todo.completed ? "bg-[#fc088e]" : "bg-[#585758]"}`} onClick={() => completed(todo._id)}>
              </div>
              <div className={`text-[20px] w-[70%] ${todo.completed ? "line-through" : ""} `}>{todo.text}</div>
              <div className="delete cursor-pointer bg-[red] w-6 h-6 flex flex-col rounded-full justify-center items-center text-center">
                <h1 className='mb-1  text-center' onClick={() => deleteTodo(todo._id)}>x</h1>
              </div>
            </div>
          ))}
        </div>
        <div className='absolute bg-gradient-to-tl from-[blue] to-[#ff002b] h-[50px] w-[50px] text-[31px] text-center rounded-full object-center flex justify-center mt-[280px] lg:mt-[180px] ml-[260px] cursor-pointer' onClick={() => setActive(true)}>
          <h1 className='text-[#3cff3c] font-bold text-center'>+</h1>

        </div>
       
        </div>
        {active && (
          <div className='w-[100vw] absolute h-[100vh] bg-black/90 flex flex-col justify-center items-center z-10'>
            <div className="flex flex-col justify-end border-2 rounded-[20px] left-4 w-[320px] ">
              <button type="button " className='w-5 h-5 bg-[red] ml-[290px] mt-2 rounded-full flex justify-center items-center text-[16px] cursor-pointer' onClick={()=>setActive(false)}>
                <p className='mb-[4px]'>x</p>
              </button>
              <div className='mx-4 p-2 gap-2 flex flex-col justify-center mb-1'>
                <label htmlFor="todo">New Todo</label>
                <input type="text" name="todo" className='outline-none border-b-[1px] border-[#3fff0f] bg-transparent  px-3 py-1' id="todo" value={todo} onChange={(e) => setTodo(e.target.value)} />
              </div>

              <button type="submit" className='mb-3 rounded-full ml-[120px] bg-gradient-to-bl from-[blue] cursor-pointer to-[#ff002b] w-20 border-2' value="" onClick={newTodo} >Create</button>
            </div>

          </div>
        )}
      </div>

    </>
  )
}

export default App
