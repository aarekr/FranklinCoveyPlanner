/* eslint-disable react/prop-types */

const NewTaskForm = ({ newTask, priority, number, addNewTask, handleTaskChange,
                       handlePriorityChange, handleNumberChange }) =>{
    return (
      <div>
        <h3>Add new tasks</h3>
        <form onSubmit={addNewTask}>
          <table>
            <tbody>
              <tr>
                <td>Task:</td>
                <td><input data-testid='taskname' value={newTask} onChange={handleTaskChange} /></td>
              </tr>
              <tr>
                <td>Priority:</td>
                <td><input data-testid='priority' value={priority} onChange={handlePriorityChange} /></td>
              </tr>
              <tr>
                <td>Number:</td>
                <td><input data-testid='number' value={number} onChange={handleNumberChange} /></td>
              </tr>
            </tbody>
          </table>
          <button type='submit'>Add task</button>
        </form>
      </div>
    )
}

export default NewTaskForm
