// requiring and defining modules
const express = require('express')
require('./db/mongoose')

const userRoutes = require('./router/user')
const taskRoutes = require('./router/task')

const app = express()

// defining ports
const port = process.env.PORT || 3000

// middleware
// app.use((req,res,next) => {
//     res.status(503).send('site is down') 
// })


// pasring json
app.use(express.json())

// routes
app.use(userRoutes)
app.use(taskRoutes)




// starting server
app.listen(port, () => console.log(`app listening on port ${port}`))


const Task = require('./models/task')

const main = async () => {
    const task = await Task.findById('5e511748cfee72244c771df4')
    await task.populate('createdBy').execPopulate()
    console.log(task.createdBy);
}


main()