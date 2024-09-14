/* eslint-disable react/prop-types */

import { Form, Button } from "react-bootstrap"

const NewTaskForm = ({ newTask, priority, number, addNewTask, handleTaskChange,
                       handlePriorityChange, handleNumberChange }) =>{
    return (
      <div>
        <h3>Add new tasks</h3>
        <Form onSubmit={addNewTask}>
          <Form.Group>
            <Form.Label>Task:</Form.Label>
            <Form.Control
              data-testid='taskname'
              value={newTask}
              onChange={handleTaskChange}
            />
            <Form.Label>Priority:</Form.Label>
            <Form.Control
              data-testid='priority'
              value={priority}
              onChange={handlePriorityChange}
            />
            <Form.Label>Number:</Form.Label>
            <Form.Control
              data-testid='number'
              value={number}
              onChange={handleNumberChange}
            />
          </Form.Group><br />
          <Button variant="primary" type="submit">Add task</Button>
        </Form>
      </div>
    )
}

export default NewTaskForm
