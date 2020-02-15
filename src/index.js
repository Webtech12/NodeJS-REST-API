// requiring and defining modules
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const Functions = require('./helper/functions')

const app = express()

// defining ports
const port = process.env.PORT || 3000

// pasring json
app.use(express.json())

// routes

// users
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    await Functions.postData(user).then(result => res.status(201).send(result)).catch(err => res.status(404).send(err.message))
})
app.get('/users', async (req, res) => {
    await Functions.fetchAll(User).then(result => res.status(200).send(result)).catch(err => res.status(500).send(err.message))
})
app.get('/user/:id', async (req, res) => {
    await Functions.fetchById(User, req.params.id).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})
app.patch('/user/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValid = updates.every(update => allowedUpdates.includes(update))

    if (!isValid) return res.status(400).send({error: 'invalid updates'})

    await Functions.updateData(User, req.params.id, req.body).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})
app.delete('/user/:id', async (req, res) => {
     await Functions.deleteData(User, req.params.id).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})




// tasks
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    await Functions.postData(task).then(result => res.status(201).send(result)).catch(err => res.status(404).send(err.message))
})
app.get('/tasks', async (req, res) => {
    await Functions.fetchAll(Task).then(result => res.status(200).send(result)).catch(err => res.status(500).send(err.message))
})
app.get('/task/:id', async (req, res) => {
    await Functions.fetchById(Task, req.params.id).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})
app.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValid = updates.every(update => allowedUpdates.includes(update))

    if (!isValid) return res.status(400).send({error: 'invalid updates'})

    await Functions.updateData(Task, req.params.id, req.body).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})
app.delete('/task/:id', async (req, res) => {
    await Functions.deleteData(Task, req.params.id).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})



// starting server
app.listen(port, () => console.log(`app listening on port ${port}`))