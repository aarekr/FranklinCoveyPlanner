import { useState, useEffect } from "react"
import taskService from '../services/tasks'
import { Notification } from "./Notification"
import Task from "./Task"
import NewTaskForm from "./NewTaskForm"
import ProgressBar from 'react-bootstrap/ProgressBar';

const Home = () => {
    const [ tasks, setTasks ] = useState([])
    const getCompletedTasks = () => {
        let completed = 0
        let started = 0
        let total = tasks.length
        if (total == 0) {
            return 0
        }
        for (let i=0; i<tasks.length; i++) {
            if (tasks[i].started == true) {
                started++
            }
            if (tasks[i].dateCompleted != dateToday) {
                continue
            }
            if (tasks[i].done == true) {
                //console.log('pvm: ', tasks[i].dateCompleted == dateToday, tasks[i].dateCompleted != dateToday)
                completed++
            }
        }
        let startedPercentage = Number((100*started/total).toFixed(2))
        console.log('getStartedTasks  : ', started, total, startedPercentage)
        let completedPercentage = Number((100*completed/total).toFixed(2))
        console.log('getCompletedTasks: ', completed, total, completedPercentage)
        return completedPercentage
    }

    const updateCompletedTasks = () => {
        setTimeout(() => {
            setDoneTasksToday(getCompletedTasks)
        }, 1000)
    }

    const [ doneTasksToday, setDoneTasksToday ] = useState(updateCompletedTasks)
    const [ startedTasksToday, setStartedTasksToday ] = useState(20)
    const [ priority, setPriority ] = useState('')
    const [ number, setNumber ] = useState('')
    const [ newTask, setNewTask ] = useState('')
    const [ message, setMessage ] = useState('')

    setTimeout(() => {
        setDoneTasksToday(getCompletedTasks)
    }, 500)

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
    /*const handleCompletedTasksChange = () => {
        setDoneTasksToday(getCompletedTasks)
    }*/
    const addNewTask = (event) => {
        event.preventDefault()
        if (newTask.length < 3) {
            alert(`Minimum length of a task is 3 characters`)
            return
        }
        if (priority.length != 1 || !(priority == 'A' || priority == 'B' || priority == 'C' || priority == 'D')) {
            alert(`Priority can only have one of these letters: A, B, C, D`)
            return
        }
        if (number < 1 || number.length > 2 || isNaN(number)) {
            alert(`Only numbers (1-99) accepted in this field`)
            return
        }
        const taskObject = {
            done: false,
            started: false,
            priority: priority,
            number: number,
            name: newTask,
            dateCreated: dateToday,
            dateCompleted: 'NA',
        }
        console.log("taskObject: ", taskObject.done, taskObject.started, taskObject.priority, 
            taskObject.number, taskObject.name, taskObject.dateCreated, taskObject.dateCompleted)
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
        //setDoneTasksToday(getCompletedTasks)
        updateCompletedTasks
    }
    const setToDone = (id) => {
        const task = tasks.find(t => t.id === id)
        const changedTask = { ...task, done: !task.done, started: false, dateCompleted: dateToday }
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
    const setToStarted = (id) => {
        const task = tasks.find(t => t.id === id)
        const changedTask = { ...task, started: !task.started }
        taskService
            .update(id, changedTask)
            .then(response => {
                setTasks(tasks.map(task => task.id !== id ? task : response.data))
                if (task.done != true) {
                    task.started 
                        ? setMessage(`Task changed back to not started`) 
                        : setMessage('Task started')
                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)
                } else if (task.done == true) {
                    setMessage(`You have completed this task and it can't be started`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)
                }
                //setStartedTasksToday(startedTasksToday + 1)
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
                    <ProgressBar variant="warning" now={startedTasksToday} />
                    <ProgressBar variant="danger" now={100-doneTasksToday-startedTasksToday} />
                </ProgressBar>
                <Task
                    tasks={tasks.filter(task => task.done === false)}
                    setToDone={setToDone}
                    setToStarted={setToStarted}
                    textDone={'done'}
                    setTasks={setTasks}
                />
                <h4>Today&apos;s completed tasks</h4>
                <Task
                    tasks={tasks.filter(task => task.done === true && task.dateCompleted == dateToday)}
                    setToDone={setToDone}
                    setToStarted={setToStarted}
                    textDone={'undone'}
                    setTasks={setTasks}
                />
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
