/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap"
import { useState } from "react"

const OldCompletedTasks = ({ tasks }) => {
    const [ searchCreated, setSearchCreated ] = useState('')
    const [ searchCompleted, setSearchCompleted ] = useState('')
    const [ searchPriority, setSearchPriority ] = useState('')
    const [ searchNumber, setSearchNumber ] = useState('')
    const [ searchName, setSearchName ] = useState('')

    const handleSearchCreated = (event) => setSearchCreated(event.target.value)
    const handleSearchCompleted = (event) => setSearchCompleted(event.target.value)
    const handleSearchPriority = (event) => setSearchPriority(event.target.value)
    const handleSearchNumber = (event) => setSearchNumber(event.target.value)
    const handleSearchName = (event) => setSearchName(event.target.value)

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
                    <tr>
                        <td><input value={searchCreated} onChange={handleSearchCreated} /></td>
                        <td><input value={searchCompleted} onChange={handleSearchCompleted} /></td>
                        <td><input value={searchPriority} onChange={handleSearchPriority} /></td>
                        <td><input value={searchNumber} onChange={handleSearchNumber} /></td>
                        <td><input value={searchName} onChange={handleSearchName} /></td>
                    </tr>
                </thead>
                <tbody>
                    {tasks
                    .filter(task => task.dateCreated.toLowerCase().includes(searchCreated.toLowerCase()))
                    .filter(task => task.dateCompleted.toLowerCase().includes(searchCompleted.toLowerCase()))
                    .filter(task => task.priority.toLowerCase().includes(searchPriority.toLowerCase()))
                    .filter(task => searchNumber == ''
                        ? task
                        : task.number == searchNumber
                            ? task.number
                            : null)
                    .filter(task => task.name.toLowerCase().includes(searchName.toLowerCase()))
                    .filter(task => task.done === true)
                    .sort((a,b) => a.number < b.number ? 1 : -1)
                    .sort((a,b) => a.priority > b.priority ? 1 : -1)
                    .map(task => 
                        <tr key={task.id}>
                            <td width="30" align="left">{task.dateCreated}</td>
                            <td width="30" align="left">{task.dateCompleted}</td>
                            <td width="30" align="left">{task.priority}</td>
                            <td width="30" align="left">{task.number}</td>
                            <td width="250" className="task">{task.name}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default OldCompletedTasks
