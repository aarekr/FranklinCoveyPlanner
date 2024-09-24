/* eslint-disable react/prop-types */

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Badge } from 'react-bootstrap';
import taskService from '../services/tasks'

const ModifyTaskModal = ({ id, name, priority, number, done, tasks, setTasks }) => {
  const [ showModal, setShowModal ] = useState(false);
  const [ newTaskName, setNewTaskName ] = useState('')
  const [ newTaskPriority, setNewTaskPriority ] = useState('')
  const [ newTaskNumber, setNewTaskNumber ] = useState('')
  const handleShow = () => setShowModal(true);

  const handleSaveAndClose = () => {
    console.log("saving and closing: ")
    changeTaskItems(newTaskName, newTaskPriority, newTaskNumber)
    setShowModal(false)
  }
  const handleCloseWithoutSaving = () => {
    console.log("closing without saving")
    setShowModal(false)
  }
  const handleDeleteAndClose = (id) => {
    let confirmDeletion = window.confirm('Are you sure you want to delete this task?')
    if (confirmDeletion) {
      console.log("deleting task: ", confirmDeletion)
      taskService
        .deleteTask(id)
        .then(response => {
          if (response.status == 204) {
            console.log("task removed from database")
            taskService.getAll().then(response => {
              setTasks(response.data)
            })
          }
        })
      setShowModal(false)
    }
  }

  const handleTaskChange = (event) => {
    setNewTaskName(event.target.value)
  }
  const handlePriorityChange = (event) => {
    setNewTaskPriority(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewTaskNumber(event.target.value)
  }

  const changeTaskItems = (newTaskName, newTaskPriority, newTaskNumber) => {
    console.log("changeTaskItems: ", newTaskName, newTaskPriority == '')
    if (newTaskName == '') newTaskName = name
    if (newTaskPriority == '') newTaskPriority = priority
    if (newTaskNumber == '') newTaskNumber = number
    const task = tasks.find(t => t.id === id)
    const changedTask = { ...task, name: newTaskName, priority: newTaskPriority, number: newTaskNumber}
    taskService
      .update(id, changedTask)
      .then(response => {
        setTasks(tasks.map(task => task.id !== id ? task : response.data))
      })
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>modify</Button>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifying task: {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Name: <input type="text" value={newTaskName} placeholder={name}
                                  onChange={handleTaskChange}></input></Modal.Body>
        <Modal.Body>Priority: <input type="text" value={newTaskPriority} placeholder={priority}
                                  onChange={handlePriorityChange}></input></Modal.Body>
        <Modal.Body>Number: <input type="text" placeholder={number}
                                  onChange={handleNumberChange}></input></Modal.Body>
        <Modal.Body>Status: {done == 'true'
                ? <Badge bg="success">done</Badge>
                : <Badge bg="danger">undone</Badge>}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveAndClose}>Save Changes</Button>
          <Button variant="secondary" onClick={handleCloseWithoutSaving}>Cancel</Button>
          <Button variant="danger" onClick={() => handleDeleteAndClose(id)}>Delete task</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModifyTaskModal
