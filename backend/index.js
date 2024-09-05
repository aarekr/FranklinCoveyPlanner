const express = require('express')
const app = express()

let tasks = [
    {
        "id": "1",
        "done": false,
        "priority": "A",
        "number": 1,
        "name": "Java 1 kpl"
    },
    {
        "id": "2",
        "done": true,
        "priority": "A",
        "number": 2,
        "name": "C# osa 1"
    },
    {
        "id": "3",
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

const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
