/* eslint-disable react/prop-types */

import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import ModifyTaskModal from './ModifyTaskModal'

const Task = ({ id, name, priority, number, done, setToDone, started, setToStarted, textDone, 
    tasks, setTasks }) => {
    console.log("Task started: ", name, started)

    return (
        <tr className="task">
            <td width="80" align="center">
                <Button variant="primary" size="sm" onClick={() => setToDone(id)}>{textDone}</Button></td>
            <td width="70" valign="center">
                <Button variant="info" size="sm" onClick={() => setToStarted(id)}>start</Button></td>
            <td width="50" align="center"><GetStatusBadge done={done} started={started} /></td>
            <td width="30" align="center">{priority}</td>
            <td width="30" align="center">{number}</td>
            <td width="250" className="task">{name}</td>
            <td width="100" align="right">
                <ModifyTaskModal id={id} name={name} priority={priority} number={number}
                    done={done} tasks={tasks} setTasks={setTasks} />
            </td>
        </tr>
   )
}

const GetStatusBadge = ({ done, started }) => {
    console.log('GetStatusBadge, done, status: ', done, started)
    if (done == 'true') {
        return <Badge bg="success">done</Badge>
    } else if (started == true) {
        return <Badge bg="warning">started</Badge>
    }
    return <Badge bg="danger">undone</Badge>
}

export default Task
