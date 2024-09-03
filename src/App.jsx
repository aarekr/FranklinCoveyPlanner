import { useState } from "react"

const App = () => {
  const [ tasks, setTasks ] = useState(
    [
      { id: 1, done: false, priority: 'A', number: 1, name: 'Java 1 kpl' },
      { id: 2, done: false, priority: 'A', number: 2, name: 'C# osa 1'},
      { id: 3, done: false, priority: 'B', number: 1, name: 'Lue 50 sivua'}
    ]
  )
  const [ id, setID ] = useState(3)
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
    event.preventDefault()
    const newID = id + 1
    setID(newID)
    const taskObject = {
      id: newID,
      done: false,
      priority: priority,
      number: number,
      name: newTask,
    }
    console.log("taskObject: ", taskObject.id, taskObject.done, taskObject.priority, taskObject.number, taskObject.name)
    setTasks(tasks.concat(taskObject))
    setPriority('')
    setNumber('')
    setNewTask('')
  }
  const setToDone = (id) => {
    console.log('marking done, id: ', id)
    const task = tasks.find(t => t.id === id)
    const changedTask = { ...task, done: !task.done}
    setTasks(tasks.map(task => task.id !== id ? task : changedTask))
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
