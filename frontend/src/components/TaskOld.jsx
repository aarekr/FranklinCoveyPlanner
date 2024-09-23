/* eslint-disable react/prop-types */

const TaskOld = ({ name, priority, number, dateCreated, dateCompleted }) => {

    return (
        <tr className="task">
            <td width="30" align="left">{dateCreated}</td>
            <td width="30" align="left">{dateCompleted}</td>
            <td width="30" align="left">{priority}</td>
            <td width="30" align="left">{number}</td>
            <td width="250" className="task">{name}</td>
        </tr>
   )
}

export default TaskOld
