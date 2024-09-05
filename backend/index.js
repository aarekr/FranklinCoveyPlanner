const express = require('express')
const app = express()

app.use(express.json())

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

let tasks = [
    {
        "id": 1,
        "done": false,
        "priority": "A",
        "number": 1,
        "name": "Java 1 kpl"
    },
    {
        "id": 2,
        "done": true,
        "priority": "A",
        "number": 2,
        "name": "C# osa 1"
    },
    {
        "id": 3,
        "done": false,
        "priority": "B",
        "number": 1,
        "name": "Lue 50 sivua"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Franklin Covey Planner</h1>')
})

app.get('/api/tasks', (request, response) => {
    response.json(tasks)
})

app.get('/api/tasks/:id', (request, response) => {
    const id = request.params.id
    const task = tasks.find(note => note.id === id)
    if (task) {
        response.json(task)
    } else {
        response.status(404).end()
    }
})

let taskID = 4
app.post('/api/tasks', (request, response) => {
    const task = request.body
    if (!task.name) {
        return response.status(400).json({
            error: 'Task name is missing'
        })
    }
    task.id = taskID
    taskID++
    tasks = tasks.concat(task)
    response.json(task)
})

app.delete('/api/tasks/:id', (request, response) => {
    const id = request.params.id
    tasks = tasks.filter(task => task.id !== id)
    response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
