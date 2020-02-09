const mongoose = require('mongoose')

// connection string
const connectionURL = 'mongodb://127.0.0.1:27017'

// connecting to MongoDB with mongoose
mongoose.connect(`${connectionURL}/task-manager-api`, { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true })

// // defining models
// const User = mongoose.model('User',{
//     name: String,
//     age: Number
// })

// // instantiating objects
// const me = new User({
//     name : 'me',
//     age : 20
// })

// // saving models
// me.save().then(res => console.log(res)).catch(err => console.error(err.name))



// tasks model
const Tasks = mongoose.model('Tasks',{
    description: {type:String, required: true},
    completed: Boolean
})

const task = new Tasks({
    description:'des 1',
    completed: true,
})

task.save().then(res => console.log(res)).catch(err => console.error(err))