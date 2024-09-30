/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import ModifyTaskModal from './ModifyTaskModal'

const Task = ({ tasks, setToDone, setToStarted, textDone, setTasks }) => {
    console.log("Tasks: ", tasks)
    return (
        <div>
            <Table striped>
                <tbody>
                    {tasks
                    .sort((a,b) => a.number < b.number ? 1 : -1)
                    .sort((a,b) => a.priority > b.priority ? 1 : -1)
                    .map(task => 
                        <tr key={task.id}>
                            <td width="80" align="center">
                                <Button variant="primary" size="sm" onClick={
                                    () => setToDone(task.id)}>{textDone}</Button></td>
                            <StartButton task={task} setToStarted={setToStarted} />
                            <td width="50" align="center">
                                <GetStatusBadge done={task.done} started={task.started} /></td>
                            <td width="30" align="center">{task.priority}</td>
                            <td width="30" align="center">{task.number}</td>
                            <td width="250" className="task">{task.name}</td>
                            <td width="100" align="right">
                                <ModifyTaskModal id={task.id} name={name} priority={task.priority}
                                    number={task.number} done={task.done} tasks={tasks}
                                    setTasks={setTasks} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

const StartButton = ({ task, setToStarted }) => {
    console.log('task.done: ', task.done)
    if (!task.done && task.started) {
        return (<td width="70" valign="center">
            <Button variant="info" size="sm" onClick={() => setToStarted(task.id)}>reset</Button></td>)
    }
    if (!task.done) {
        return (<td width="70" valign="center">
            <Button variant="info" size="sm" onClick={() => setToStarted(task.id)}>start</Button></td>)
    }
}

const GetStatusBadge = ({ done, started }) => {
    console.log('GetStatusBadge done: ', done)
    if (done == true) {
        return <Badge bg="success">done</Badge>
    } else if (started == true) {
        return <Badge bg="warning">started</Badge>
    }
    return <Badge bg="danger">undone</Badge>
}

export default Task
