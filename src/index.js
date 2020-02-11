// requiring and defining modules
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()

// defining ports
const port = process.env.PORT || 3000

// pasring json
app.use(express.json())

// routes
app.post('/users', (req, res) => {
    const user = new User(req.body)

    // saving models
    user.save().then(() => res.send(user)).catch(err => console.error(err.message))
})


// starting server
app.listen(port, () => console.log(`app listening on port ${port}`))