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

  const now = new Date()
  const dateSplit = now.toString().split(" ")
  const dateToday = `${dateSplit[1]} ${dateSplit[2]}`

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
      dateCreated: dateToday,
      dateCompleted: 'NA',
    }
    console.log("taskObject: ", taskObject.done, taskObject.priority, taskObject.number, 
      taskObject.name, taskObject.dateCreated, taskObject.dateCompleted)
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
    const changedTask = { ...task, done: !task.done, dateCompleted: dateToday}
    taskService
      .update(id, changedTask)
      .then(response => {
        setTasks(tasks.map(task => task.id !== id ? task : response.data))
        task.done ? setMessage(`Task changed to: undone`) : setMessage(`Task changed to: done`)
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
          {tasks
            .filter(task => task.done === false)
            .sort((a,b) => a.number < b.number ? 1 : -1)
            .sort((a,b) => a.priority > b.priority ? 1 : -1)
            .map(task =>
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                priority={task.priority}
                number={task.number}
                done={task.done.toString()}
                setToDone={setToDone}
                text={'mark done'}
                tasks={tasks}
                setTasks={setTasks}
              />
          )}
        </tbody>
      </Table><br />
      <h4>Today&apos;s completed tasks</h4>
      <Table striped>
        <tbody>
          {tasks
            .filter(task => task.done === true && task.dateCompleted == dateToday)
            .sort((a,b) => a.number < b.number ? 1 : -1)
            .sort((a,b) => a.priority > b.priority ? 1 : -1)
            .map(task =>
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                priority={task.priority}
                number={task.number}
                done={task.done.toString()}
                setToDone={setToDone}
                text={'mark undone'}
                tasks={tasks}
                setTasks={setTasks}
              />
          )}
        </tbody>
      </Table>
      <Notification message={message} />
      <br />
      <p>All tasks</p>
      <ul>
        {tasks.map(task => <li key={task.name}>{task.name}-{task.done.toString()}-{task.dateCreated}</li>)}
      </ul>
      <p>Tasks of earlier days:</p>
      {tasks
        .filter(task => task.done != false && task.dateCreated != dateToday)
        .map(task => <li key={task.id}>{task.name} - {task.dateCreated} - {task.dateCompleted}</li>)}
      <hr />
      <NewTaskForm newTask={newTask} priority={priority} number={number}
        addNewTask={addNewTask} handleTaskChange={handleTaskChange}
        handlePriorityChange={handlePriorityChange} handleNumberChange={handleNumberChange} />
    </div>
  )
}

export default App
