const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert').strict
const Task = require('../models/task')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

/* test commands:
  npm test
  npm test -- --test-only
  npm test -- tests/task_api.test.js
  npm run test -- --test-name-pattern="tasks"
*/

const initialTasks = [
  {
    done: 'false',
    priority: 'B',
    number: 2,
    name: 'Java Spring Boot Security'
  },
  {
    done: 'false',
    priority: 'A',
    number: 3,
    name: 'C#.NET programming'
  },
  {
    done: 'true',
    priority: 'A',
    number: 1,
    name: 'Node backend testing'
  }
]

beforeEach(async () => {
  await Task.deleteMany({})
  await Task.insertMany(initialTasks)
})

describe('tasks are in database and in right format', () => {
  test('tasks are returned as json', async () => {
    await api
      .get('/api/tasks')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 3 tasks in the database', async () => {
    const response = await api.get('/api/tasks')
    assert.strictEqual(response.body.length, initialTasks.length)
  })

  test('the tasks are the ones entered', async () => {
    const response = await api.get('/api/tasks')
    const names = response.body.map(e => e.name)
    assert(names.includes('Java Spring Boot Security'))
    assert(names.includes('C#.NET programming'))
    assert(names.includes('Node backend testing'))
  })
})

describe('new tasks can be added with right credentials', async () => {
  test('a new task can be added', async () => {
    let newTaskObject = new Task({
      done: 'false',
      priority: 'C',
      number: 2,
      name: 'C++ Module 5'
    })
    await newTaskObject.save()
    const response = await api.get('/api/tasks')
    const names = response.body.map(e => e.name)
    assert.strictEqual(response.body.length, initialTasks.length + 1)
    assert(names.includes('C++ Module 5'))
  })

  test('a new task without task name is not added', async () => {
    let newTaskObject = new Task({
      done: 'false',
      priority: 'C',
      number: 2,
      name: ''
    })
    await api
      .post('/api/tasks')
      .send(newTaskObject)
      .expect(400)
    const response = await api.get('/api/tasks')
    assert.strictEqual(response.body.length, initialTasks.length)
  })

  test('a new task without priority is not added', async () => {
    let newTaskObject = new Task({
      done: 'false',
      priority: '',
      number: 2,
      name: 'Task without priority'
    })
    await api
      .post('/api/tasks')
      .send(newTaskObject)
      .expect(400)
    const response = await api.get('/api/tasks')
    const names = response.body.map(e => e.name)
    assert.strictEqual(response.body.length, initialTasks.length)
    assert(!names.includes('Task without priority'))
  })

  test('a new task without number is not added', async () => {
    let newTaskObject = new Task({
      done: 'false',
      priority: 'C',
      name: 'Task without number'
    })
    await api
      .post('/api/tasks')
      .send(newTaskObject)
      .expect(400)
    const response = await api.get('/api/tasks')
    const names = response.body.map(e => e.name)
    assert.strictEqual(response.body.length, initialTasks.length)
    assert(!names.includes('Task without number'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
