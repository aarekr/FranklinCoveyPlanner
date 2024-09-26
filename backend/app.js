const express = require('express')
const app = express()

const Task = require('./models/task')

const cors = require('cors')
app.use(cors())
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

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
  Task.findById(request.params.id)
    .then(task => {
      if (task) {
        response.json(task)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'id is not correct' })
    })
})

app.post('/api/tasks', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'Task name is missing'
    })
  }
  if (!body.priority) {
    return response.status(400).json({
      error: 'Task priority is missing'
    })
  }
  const task = new Task({
    done: body.done,
    started: body.started,
    priority: body.priority,
    number: body.number,
    name: body.name,
    dateCreated: body.dateCreated,
    dateCompleted: body.dateCompleted,
  })
  task.save()
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

// update
app.put('/api/tasks/:id', (request, response, next) => {
  const body = request.body
  const task = {
    done: body.done,
    started: body.started,
    priority: body.priority,
    number: body.number,
    name: body.name,
    dateCreated: body.dateCreated,
    dateCompleted: body.dateCompleted,
  }
  Task.findByIdAndUpdate(request.params.id, task, { new: true })
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.delete('/api/tasks/:id', (request, response, next) => {
  Task.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
