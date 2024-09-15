/* eslint-disable react/prop-types */

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Badge } from 'react-bootstrap';

const ModifyTaskModal = ({ name, done, id, setToDone, text }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleSaveAndClose = () => {
    console.log("saving and closing")
    setShow(false)
  }
  const handleCloseWithoutSaving = () => {
    console.log("closing without saving")
    setShow(false)
  }
  const handleDeleteAndClose = () => {
    let confirmDeletion = window.confirm('Are you sure you want to delete this task?')
    console.log("deleting task: ", confirmDeletion)
    setShow(false)
  }
  const handleTaskChange = (event) => {
    console.log(event.target.value)
    //setNewTask(event.target.value)
  }
  let newTaskName = ''  // import this from App

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>modify</Button>
      <Modal show={show}>
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
          <Button variant="danger" onClick={handleDeleteAndClose}>Delete task</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModifyTaskModal
