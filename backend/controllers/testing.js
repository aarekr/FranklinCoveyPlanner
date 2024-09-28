const router = require('express').Router()
const Task = require('../models/task')

router.post('/reset', async (request, response) => {
  await Task.deleteMany({})
  response.status(204).end()
})

module.exports = router
