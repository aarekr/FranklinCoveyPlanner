import { useState, useEffect } from "react"
import taskService from './services/tasks'
import { Notification } from "./components/Notification"

const App = () => {
  const [ tasks, setTasks ] = useState([])
  const [ priority, setPriority ] = useState('')
  const [ number, setNumber ] = useState('')
  const [ newTask, setNewTask ] = useState('')
  const [ message, setMessage ] = useState('')

  useEffect(() => {
    taskService
      .getAll()
      .then(response => {
        setTasks(response.data)
      })
  }, [])

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
    const taskObject = {
      done: false,
      priority: priority,
      number: number,
      name: newTask,
    }
    console.log("taskObject: ", taskObject.done, taskObject.priority, taskObject.number, taskObject.name)
    taskService
      .create(taskObject)
      .then(response => {
        setTasks(tasks.concat(response.data))
        setMessage('New task added to the list')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setPriority('')
        setNumber('')
        setNewTask('')
      })
  }
  const setToDone = (id) => {
    console.log('marking done, id: ', id)
    const task = tasks.find(t => t.id === id)
    const changedTask = { ...task, done: !task.done}
    taskService
      .update(id, changedTask)
      .then(response => {
        setTasks(tasks.map(task => task.id !== id ? task : response.data))
        task.done ? setMessage(`Task changed to: done`) : setMessage(`Task changed to: undone`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  return(
    <div>
      <h1>Franklin Covey Planner</h1>
      <hr/>
      <h3>Prioritized Daily Tasks List</h3>
      <h4>Today's tasks</h4>
      <table border="5.0">
        <tbody>
          {tasks
            .filter(task => task.done === false)
            .sort((a,b) => b.letter - a.letter ? 1 : -1)
            .sort((a,b) => b.number - a.number ? -1 : 1)
            .map(task => <tr key={task.id}>
            <td width="100"align="center"><button onClick={() => setToDone(task.id)}>mark done</button></td>
            <td width="50" align="center">{task.done.toString()} </td>
            <td width="30" align="center">{task.priority}</td>
            <td width="30" align="center">{task.number}</td>
            <td width="250">{task.name}</td>
          </tr>)}
        </tbody>
      </table>
      <h4>Today's completed tasks</h4>
      <table border="5.0">
        <tbody>
          {tasks.filter(task => task.done === true).map(task => <tr key={task.id}>
            <td width="100"align="center"><button onClick={() => setToDone(task.id)}>mark undone</button></td>
            <td width="50" align="center">{task.done.toString()} </td>
            <td width="30" align="center">{task.priority}</td>
            <td width="30" align="center">{task.number}</td>
            <td width="250">{task.name}</td>
          </tr>)}
        </tbody>
      </table>
      <Notification message={message} />
      <br />
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
