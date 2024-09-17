/* eslint-disable react/prop-types */

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Badge } from 'react-bootstrap';
import taskService from '../services/tasks'

const ModifyTaskModal = ({ name, done, id, setToDone, text, tasks, setTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  const handleSaveAndClose = () => {
    console.log("saving and closing")
    setShowModal(false)
  }
  const handleCloseWithoutSaving = () => {
    console.log("closing without saving")
    setShowModal(false)
  }
  const handleDeleteAndClose = (id) => {
    //console.log(event.target.value)
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
    console.log(event.target.value)
    //setNewTask(event.target.value)
  }
  let newTaskName = ''  // import this from App

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>modify</Button>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifying task: {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Name: <input type="text" value={newTaskName} onChange={handleTaskChange}></input></Modal.Body>
        
        <Modal.Body>Status: {done == 'true'
                ? <Badge bg="success">done</Badge>
                : <Badge bg="danger">undone</Badge>}</Modal.Body>
        <Modal.Body><Button variant="primary" size="sm" onClick={() => setToDone(id)}>{text}</Button></Modal.Body>
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
