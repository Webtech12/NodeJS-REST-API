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





// const hashMake = async (params) => {
//     const hasedData = await bcrypt.hash('password',8)
//     console.log(hasedData)

//     const isMatch = await bcrypt.compare('password', hasedData)
//     console.log(isMatch)
// }

// hashMake()

// starting server
app.listen(port, () => console.log(`app listening on port ${port}`))