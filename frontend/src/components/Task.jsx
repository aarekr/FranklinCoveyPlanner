/* eslint-disable react/prop-types */

const Task = ({ setToDone, id, done, priority, number, name, text }) => {

   return (
    <tr className="task">
        <td width="100" align="center"><button onClick={() => setToDone(id)}>{text}</button></td>
        <td width="50" align="center">{done}</td>
        <td width="30" align="center">{priority}</td>
        <td width="30" align="center">{number}</td>
        <td width="250" className="task">{name}</td>
    </tr>
   )
}

export default Task
