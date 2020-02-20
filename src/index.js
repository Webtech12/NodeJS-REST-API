// requiring and defining modules
const express = require('express')
require('./db/mongoose')

const userRoutes = require('./router/user')
const taskRoutes = require('./router/task')

const app = express()

// defining ports
const port = process.env.PORT || 3000

// pasring json
app.use(express.json())

// routes
app.use(userRoutes)
app.use(taskRoutes)



// starting server
app.listen(port, () => console.log(`app listening on port ${port}`))