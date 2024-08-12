import { useState } from "react"

const App = () => {
  const [ tasks, setTasks ] = useState(
    [
      { letter: 'A', number: 1, task: 'Java 1 kpl' },
      { letter: 'A', number: 2, task: 'C# osa 1'},
      { letter: 'B', number: 1, task: 'Lue 50 sivua'}
    ]
  )
  const [ newTask, setNewTask ] = useState('')
  const handleTaskChange = (event) => {
    setNewTask(event.target.value)
  }
  const addNewTask = (event) => {
    event.preventDefault()
    const taskObject = {
      letter: '_',
      number: '_',
      task: newTask,
    }
    setTasks(tasks.concat(taskObject))
    setNewTask('')
  }

  return(
    <div>
      <h1>Franklin Covey Planner</h1>
      <hr/>
      <h3>Prioritized Daily Task List</h3>
      <ul>
        {tasks.map(item => <li>{item.letter}{item.number} : {item.task}</li>)}
      </ul>
      <form onSubmit={addNewTask}>
        <input value={newTask} onChange={handleTaskChange} />
        <button type='submit'>Add new task</button>
      </form>
    </div>
  )
}

export default App
