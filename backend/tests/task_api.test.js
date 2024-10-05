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

  test('two new tasks can be added', async () => {
    let newTaskObject1 = new Task({
      done: 'false',
      priority: 'A',
      number: 2,
      name: 'Big Data Platforms exercise ML'
    })
    await newTaskObject1.save()
    let newTaskObject2 = new Task({
      done: 'false',
      priority: 'C',
      number: 3,
      name: 'Tie koodariksi part 16'
    })
    await newTaskObject2.save()
    const response = await api.get('/api/tasks')
    const names = response.body.map(e => e.name)
    assert.strictEqual(response.body.length, initialTasks.length + 2)
    assert(names.includes('Big Data Platforms exercise ML'))
    assert(names.includes('Tie koodariksi part 16'))
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

  test('only tasks with required fields are added', async() => {
    let newTaskObject1 = new Task({
      done: 'false',
      priority: 'D',
      number: 3,
      name: 'All required fields given'
    })
    let newTaskObject2 = new Task({
      done: 'false',
      priority: '',
      number: 3,
      name: 'Missing priority task'
    })
    let newTaskObject3 = new Task({
      done: 'false',
      priority: 'C',
      number: '',
      name: 'Missing number task'
    })
    await newTaskObject1.save()
    await api
      .post('/api/tasks')
      .send(newTaskObject2)
      .expect(400)
    await api
      .post('/api/tasks')
      .send(newTaskObject3)
      .expect(400)
    const response = await api.get('/api/tasks')
    const names = response.body.map(e => e.name)
    assert.strictEqual(response.body.length, initialTasks.length + 1)
    assert(names.includes('All required fields given'))
    assert(!names.includes('Missing priority task'))
    assert(!names.includes('Missing number task'))
  })
})

describe('tasks can be deleted ', async () => {
  test('first task in db can be deleted', async() => {
    const tasks = await Task.find({})
    await tasks[0].deleteOne()
    const response = await api.get('/api/tasks')
    const names = response.body.map(e => e.name)
    assert.strictEqual(response.body.length, initialTasks.length - 1)
    assert(!names.includes('Java Spring Boot Security'))
    assert(names.includes('C#.NET programming'))
    assert(names.includes('Node backend testing'))
  })

  test('second task in db can be deleted', async() => {
    const tasks = await Task.find({})
    await tasks[1].deleteOne()
    const response = await api.get('/api/tasks')
    const names = response.body.map(e => e.name)
    assert.strictEqual(response.body.length, initialTasks.length - 1)
    assert(names.includes('Java Spring Boot Security'))
    assert(!names.includes('C#.NET programming'))
    assert(names.includes('Node backend testing'))
  })

  test('third task in db can be deleted', async() => {
    const tasks = await Task.find({})
    await tasks[2].deleteOne()
    const response = await api.get('/api/tasks')
    const names = response.body.map(e => e.name)
    assert.strictEqual(response.body.length, initialTasks.length - 1)
    assert(names.includes('Java Spring Boot Security'))
    assert(names.includes('C#.NET programming'))
    assert(!names.includes('Node backend testing'))
  })

  test('all 3 tasks in db can be deleted', async () => {
    const tasks = await Task.find({})
    await tasks[2].deleteOne()
    await tasks[1].deleteOne()
    await tasks[0].deleteOne()
    // await Task.deleteMany({})  // or all at once
    const response = await api.get('/api/tasks')
    const names = response.body.map(e => e.name)
    assert.strictEqual(response.body.length, 0)
    assert(!names.includes('Java Spring Boot Security'))
    assert(!names.includes('C#.NET programming'))
    assert(!names.includes('Node backend testing'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
