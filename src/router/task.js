const express = require('express')
const Task = require('../models/task')
const Functions = require('../helper/functions')
const router = new express.Router()
const auth = require('../middleware/auth')


// tasks
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({...req.body, createdBy: req.user._id})
    await Functions.postData(task).then(result => res.status(201).send(result)).catch(err => res.status(404).send(err.message))
})
router.get('/tasks', async (req, res) => {
    await Functions.fetchAll(Task).then(result => res.status(200).send(result)).catch(err => res.status(500).send(err.message))
})
router.get('/task/:id', async (req, res) => {
    await Functions.fetchById(Task, req.params.id).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})
router.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValid = updates.every(update => allowedUpdates.includes(update))

    if (!isValid) return res.status(400).send({error: 'invalid updates'})

    await Functions.updateData(Task, req.params.id, req.body).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})
router.delete('/task/:id', async (req, res) => {
    await Functions.deleteData(Task, req.params.id).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})



module.exports = router