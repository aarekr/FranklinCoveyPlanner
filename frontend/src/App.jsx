import { useState, useEffect } from "react"
import taskService from './services/tasks'
import { Notification } from "./components/Notification"
import Task from "./components/Task"
import NewTaskForm from "./components/NewTaskForm"
import { Table } from "react-bootstrap"

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
    <div className="container">
      <h1>Franklin Covey Planner</h1>
      <hr/>
      <h3>Prioritized Daily Tasks List</h3> <br />
      <h4>Today&apos;s tasks</h4>
      <Table striped>
        <tbody>
          {tasks.filter(task => task.done === false).map(task =>
            <Task
              key={task.id}
              setToDone={setToDone}
              id={task.id}
              done={task.done.toString()}
              priority={task.priority}
              number={task.number}
              name={task.name}
              text={'mark done'} />
          )}
        </tbody>
      </Table>
      <h4>Today&apos;s completed tasks</h4>
      <Table striped>
        <tbody>
          {tasks.filter(task => task.done === true).map(task =>
            <Task
              key={task.id}
              setToDone={setToDone}
              id={task.id}
              done={task.done.toString()}
              priority={task.priority}
              number={task.number}
              name={task.name}
              text={'mark undone'} />
          )}
        </tbody>
      </Table>
      <Notification message={message} />
      <br />
      <hr />
      <NewTaskForm newTask={newTask} priority={priority} number={number}
        addNewTask={addNewTask} handleTaskChange={handleTaskChange}
        handlePriorityChange={handlePriorityChange} handleNumberChange={handleNumberChange} />
    </div>
  )
}

export default App
