/* eslint-disable react/prop-types */

import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import ModifyTaskModal from './ModifyTaskModal'

const Task = ({ setToDone, id, done, priority, number, name, text, tasks, setTasks,
    handleTaskChange, 
 }) => {

    return (
        <tr className="task">
            <td width="100" align="center">
                <Button variant="primary" size="sm" onClick={() => setToDone(id)}>{text}</Button></td>
            <td width="50" align="center">{done == 'true'
                ? <Badge bg="success">done</Badge>
                : <Badge bg="danger">undone</Badge>}</td>
            <td width="30" align="center">{priority}</td>
            <td width="30" align="center">{number}</td>
            <td width="250" className="task">{name}</td>
            <td width="100" align="right">
                <ModifyTaskModal name={name} done={done} id={id} setToDone={setToDone} text={text}
                    priority={priority} number={number}
                    tasks={tasks} setTasks={setTasks}
                    handleTaskChange={handleTaskChange} />
            </td>
        </tr>
   )
}

export default Task
