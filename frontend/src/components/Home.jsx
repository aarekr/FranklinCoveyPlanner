import { useState, useEffect } from "react"
import taskService from '../services/tasks'
import { Notification } from "./Notification"
import Task from "./Task"
import NewTaskForm from "./NewTaskForm"
import { Table } from "react-bootstrap"
import ProgressBar from 'react-bootstrap/ProgressBar';

const Home = () => {
    const [ tasks, setTasks ] = useState([])
    const getCompletedTasks = () => {
        let completed = 0
        let total = tasks.length
        if (total == 0) {
            return 0
        }
        for (let i=0; i<tasks.length; i++) {
            if (tasks[i].dateCompleted != dateToday) {
                continue
            }
            if (tasks[i].done == true) {
                console.log('pvm: ', tasks[i].dateCompleted == dateToday, tasks[i].dateCompleted != dateToday)
                completed++
            }
        }
        console.log('getCompletedTasks: ', completed, total)
        console.log('getCompletedTasks: ', completed, total, Number(completed/total))
        return Number(100 * completed / total)
    }

    const [ doneTasksToday, setDoneTasksToday ] = useState(getCompletedTasks)
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
    const handleCompletedTasksChange = () => {
        setDoneTasksToday(getCompletedTasks)
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
                handleCompletedTasksChange
                setDoneTasksToday(getCompletedTasks)
            })
    }

    return (
        <div className="form-group row">
            <br />
            <div className="col-7">
                <br />
                <h3>Prioritized Daily Tasks List</h3> <br />
                <h4>Today&apos;s tasks</h4>
                <ProgressBar now={doneTasksToday} label={`${doneTasksToday}%`} />
                <ProgressBar>
                    <ProgressBar variant="success" now={doneTasksToday} label={`${doneTasksToday}%`} />
                    <ProgressBar variant="warning" now={20} key={2} />
                    <ProgressBar variant="danger" now={100-doneTasksToday-20} key={3} />
                </ProgressBar>
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
                <hr />
            </div>
            <div className="col-sm-3">
                <NewTaskForm newTask={newTask} priority={priority} number={number}
                    addNewTask={addNewTask} handleTaskChange={handleTaskChange}
                    handlePriorityChange={handlePriorityChange} handleNumberChange={handleNumberChange} />
            </div>
        </div>
    )
}

export default Home
