const express = require('express')
const app = express()
require('dotenv').config()

const mongoose = require('mongoose')

const Task = require('./models/task')

const cors = require('cors')
app.use(cors())
app.use(express.json())

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
    response.send('<h1>Franklin Covey Planner</h1>')
})

app.get('/api/tasks', (request, response) => {
    Task.find({}).then(tasks => {
        response.json(tasks)
    })
})

app.get('/api/tasks/:id', (request, response) => {
    Task.findById(request.params.id).then(task => {
        response.json(task)
    })
})

app.post('/api/tasks', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'Task name is missing'
        })
    }
    const task = new Task({
        done: body.done,
        priority: body.priority,
        number: body.numer,
        name: body.name
    })
    task.save().then(result => {
        response.json(result)
    })
})

// update
app.put('/api/tasks/:id', (request, response, next) => {
    const body = request.body
    const task = {
        done: body.done,
        priority: body.priority,
        number: body.numer,
        name: body.name
    }
    Task.findByIdAndUpdate(request.params.id, task, { new: true })
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

app.delete('/api/tasks/:id', (request, response, next) => {
    Task.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
