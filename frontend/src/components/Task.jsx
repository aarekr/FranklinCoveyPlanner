const Task = ({ setToDone, id, done, priority, number, name, text }) => {

   return (
    <tr>
        <td width="100" align="center"><button onClick={() => setToDone(id)}>{text}</button></td>
        <td width="50" align="center">{done}</td>
        <td width="30" align="center">{priority}</td>
        <td width="30" align="center">{number}</td>
        <td width="250">{name}</td>
    </tr>
   )
}

export default Task
