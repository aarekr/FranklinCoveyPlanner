import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { Navbar, Nav } from 'react-bootstrap'
import taskService from './services/tasks'
import Home from './components/Home'
import OldCompletedTasks from './components/OldCompletedTasks'

const App = () => {
  const [ tasks, setTasks ] = useState([])

  useEffect(() => {
    taskService
      .getAll()
      .then(response => {
        setTasks(response.data)
      })
  }, [])

  const padding = {
    padding: 5
  }

  return(
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" style={{marginLeft: "200"}}>
            <h2 style={{ color:'white' }}>Franklin Covey Planner</h2>
            <Nav.Link href="/" as="span">
              <Link style={padding} to="/">HOME</Link>
            </Nav.Link>
            <Nav.Link href="/oldcompleted" as="span">
              <Link style={padding} to="/oldcompleted">OLD TASKS</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oldcompleted" element={<OldCompletedTasks tasks={tasks} />} />
      </Routes>
    </Router>
  )
}

export default App
