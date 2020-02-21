const express = require('express')
const User = require('../models/user')
const Functions = require('../helper/functions')
const router = new express.Router()


// login users
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.fetchByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})


// users CRUD
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    await Functions.postData(user).then(result => res.status(201).send({result, token})).catch(err => res.status(404).send(err.message))
})
router.get('/users', async (req, res) => {
    await Functions.fetchAll(User).then(result => res.status(200).send(result)).catch(err => res.status(500).send(err.message))
})
router.get('/user/:id', async (req, res) => {
    await Functions.fetchById(User, req.params.id).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})
router.patch('/user/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValid = updates.every(update => allowedUpdates.includes(update))

    if (!isValid) return res.status(400).send({error: 'invalid updates'})

    await Functions.updateData(User, req.params.id, req.body).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})
router.delete('/user/:id', async (req, res) => {
     await Functions.deleteData(User, req.params.id).then(result => res.status(200).send(result)).catch(err => res.status(404).send(err.message))
})



module.exports = router
