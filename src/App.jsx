import { useState, useEffect } from "react"
import axios from 'axios'

const App = () => {
  const [ tasks, setTasks ] = useState([])
  //const [ id, setID ] = useState(3)
  const [ priority, setPriority ] = useState('')
  const [ number, setNumber ] = useState('')
  const [ newTask, setNewTask ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/tasks')
      .then(response => {
        setTasks(response.data)
      })
  })

  const handleTaskChange = (event) => {
    setNewTask(event.target.value)
  }
  const handlePriorityChange = (event) => {
    setPriority(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }
  const addNewTask = (event) => {
    event.preventDefault()
    //const newID = id + 1
    //setID(newID)
    const taskObject = {
      done: false,
      priority: priority,
      number: number,
      name: newTask,
    }
    console.log("taskObject: ", taskObject.done, taskObject.priority, taskObject.number, taskObject.name)
    axios
      .post('http://localhost:3001/tasks', taskObject)
      .then(response => {
        setTasks(tasks.concat(response.data))
      })

    setTasks(tasks.concat(taskObject))
    setPriority('')
    setNumber('')
    setNewTask('')
  }
  const setToDone = (id) => {
    console.log('marking done, id: ', id)
    const url = `http://localhost:3001/tasks/${id}`
    const task = tasks.find(t => t.id === id)
    const changedTask = { ...task, done: !task.done}
    axios.put(url, changedTask)
      .then(respose => {
        setTasks(tasks.map(task => task.id !== id ? task : respose.data))
      })
  }

  return(
    <div>
      <h1>Franklin Covey Planner</h1>
      <hr/>
      <h3>Prioritized Daily Task List</h3>
      <ol>
        {tasks.map(task => <li key={task.id}>
          <button onClick={() => setToDone(task.id)}>mark done</button> {' '}
          {task.done.toString()} {' '}
          {task.priority}
          {task.number} 
          : {task.name}</li>
        )}
      </ol>
      <hr />
      <h3>Add a new task</h3>
      <form onSubmit={addNewTask}>
        <table>
          <tbody>
            <tr>
              <td>Task:</td>
              <td><input value={newTask} onChange={handleTaskChange} /></td>
            </tr>
            <tr>
              <td>Priority:</td>
              <td><input value={priority} onChange={handlePriorityChange} /></td>
            </tr>
            <tr>
              <td>Number:</td>
              <td><input value={number} onChange={handleNumberChange} /></td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>Add task</button>
      </form>
    </div>
  )
}

export default App
