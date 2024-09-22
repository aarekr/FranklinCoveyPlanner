import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import taskService from './services/tasks'
import Home from './components/Home'
import OldCompletedTasks from './components/OldCompletedTasks'

const App = () => {
  const [ tasks, setTasks ] = useState([])

  /*const now = new Date()
  const dateSplit = now.toString().split(" ")
  const dateToday = `${dateSplit[1]} ${dateSplit[2]}`*/

  useEffect(() => {
    taskService
      .getAll()
      .then(response => {
        setTasks(response.data)
      })
  }, [])

  return(
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/oldcompleted">Old completed tasks</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oldcompleted" element={<OldCompletedTasks tasks={tasks} />} />
      </Routes>
    </Router>
  )
}

export default App
