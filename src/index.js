// requiring and defining modules
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()

// defining ports
const port = process.env.PORT || 3000

// pasring json
app.use(express.json())

// routes

// users
app.post('/users', (req, res) => {
    const user = new User(req.body)

    // saving models
    user.save().then(() => res.send(user)).catch(err => res.status(400).send(err))
})

// tasks
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then((result) => res.send(result)).catch((err) => res.status(400).send(err))
})



// starting server
app.listen(port, () => console.log(`app listening on port ${port}`))