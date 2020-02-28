const express = require('express')
const User = require('../models/user')
const Functions = require('../helper/functions')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')


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




// uploads conig
const upload = multer({
    dest: 'avatars',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.endsWith('.pdf')) return cb(new Error('upload a pdf'))

        cb(undefined, true)
    }
})

// route
router.post('/users/me/avatar', upload.single('avatar'),async (req, res) => {
  res.status(200).send('POST request to the homepage')
})






// logout 1 user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => { return token.token !== req.token })

        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// logout all user sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


// users CRUD
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    await Functions.postData(user).then(result => res.status(201).send({result, token})).catch(err => res.status(404).send(err.message))
})
router.get('/user/me', auth, async (req, res) => {
    await res.send(req.user)
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
