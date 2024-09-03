import { useState } from "react"

const App = () => {
  const [ tasks, setTasks ] = useState(
    [
      { priority: 'A', number: 1, name: 'Java 1 kpl' },
      { priority: 'A', number: 2, name: 'C# osa 1'},
      { priority: 'B', number: 1, name: 'Lue 50 sivua'}
    ]
  )
  const [ priority, setPriority] = useState('')
  const [ number, setNumber ] = useState('')
  const [ newTask, setNewTask ] = useState('')
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
    console.log("addNewTask priority: ", priority)
    console.log("addNewTask number  : ", number)
    console.log("addNewTask newTask : ", newTask)
    event.preventDefault()
    const taskObject = {
      priority: priority,
      number: number,
      name: newTask,
    }
    setTasks(tasks.concat(taskObject))
    setPriority('')
    setNumber('')
    setNewTask('')
  }

  return(
    <div>
      <h1>Franklin Covey Planner</h1>
      <hr/>
      <h3>Prioritized Daily Task List</h3>
      <ul>
        {tasks.map(item => <li key={item.name}>{item.priority}{item.number} : {item.name}</li>)}
      </ul>
      <hr />
      <h4>Add a new task</h4>
      <form onSubmit={addNewTask}>
        Task: <input value={newTask} onChange={handleTaskChange} /> <br />
        Priority: <input value={priority} onChange={handlePriorityChange} /> <br />
        Number: <input value={number} onChange={handleNumberChange} /> <br />
        <br />
        <button type='submit'>Add new task</button>
      </form>
    </div>
  )
}

export default App
