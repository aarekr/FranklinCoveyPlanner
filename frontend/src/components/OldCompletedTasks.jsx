/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap"
import TaskOld from "./TaskOld"

const OldCompletedTasks = ({ tasks }) => {    
    return (
        <div>
            <br /><h2>Old completed tasks</h2> <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th align="center">Created</th>
                        <th align="center">Completed</th>
                        <th align="center">Priority</th>
                        <th align="center">Number</th>
                        <th align="center">Task</th>
                    </tr>
                </thead>
                <tbody>
                {tasks
                    .filter(task => task.done === true)
                    .sort((a,b) => a.number < b.number ? 1 : -1)
                    .sort((a,b) => a.priority > b.priority ? 1 : -1)
                    .map(task =>
                    <TaskOld
                        key={task.id}
                        name={task.name}
                        priority={task.priority}
                        number={task.number}
                        dateCreated={task.dateCreated}
                        dateCompleted={task.dateCompleted}
                    />
                )}
                </tbody>
            </Table><br />
        </div>
    )
}

export default OldCompletedTasks
