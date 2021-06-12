import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Fotter";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState,  useEffect } from "react";
import About from "./components/About"
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([]);

  useEffect(()=>{
    const getTasks = async() =>{
      const fetchTasksFromServer = await fetchTasks()
      setTask(fetchTasksFromServer)
    }
    getTasks()

  }, [])

  //FetchTasks
  const  fetchTasks = async ()=>{
    const res = await fetch('http://localhost:5000/tasks') 
    const data =await  res.json()
    return data
  }

    //FetchTask
    const  fetchTask = async (id)=>{
      const res = await fetch(`http://localhost:5000/tasks/${id}`) 
      const data =await  res.json()
      return data
    }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers:{
      'Content-type':'application/json',
    },
    body:JSON.stringify(task),
    })

    const data =await res.json()

    setTask([...tasks, data])
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task };
    // setTask([...tasks, newTask]);
  };

  const deleteTask =async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method:'DELETE'})
    setTask(tasks.filter((ele) => ele.id !== id));
  };

  const toggleReminder =async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {...taskToToggle, reminder:!taskToToggle.reminder}

    const res = await fetch (`http://localhost:5000/tasks/${id}`, {method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(updateTask)
    })

    const data = await res.json()

    setTask(
      tasks.map((ele) =>
        ele.id === id ? { ...ele, reminder: data.reminder } : ele
      )
    );
  };

  return (
    <Router>
    <div className="container">
      <Header 
      onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}/>
      <Route path='/' exact render={()=>(
      <>
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks task={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No task to show, Please add task"
      )}

      </>
      )}/>
      <Route path='/about' component={About} />
      <Footer/>
    </div>
    </Router>
  );
}
