const NewTaskForm = ({ newTask, priority, number, addNewTask, handleTaskChange,
                       handlePriorityChange, handleNumberChange }) =>{
    return (
        <form onSubmit={addNewTask}>
        <table>
          <tbody>
            <tr>
              <td>Task:</td>
              <td><input value={newTask} onChange={handleTaskChange} /></td>
            </tr>
            <tr>
              <td>Priority:</td>
              <td><input value={priority} onChange={handlePriorityChange} /></td>
            </tr>
            <tr>
              <td>Number:</td>
              <td><input value={number} onChange={handleNumberChange} /></td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>Add task</button>
      </form>
    )
}

export default NewTaskForm
