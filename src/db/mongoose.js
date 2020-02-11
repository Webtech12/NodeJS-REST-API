const mongoose = require('mongoose')
const validator = require('validator')

// connection string
const connectionURL = 'mongodb://127.0.0.1:27017'

// connecting to MongoDB with mongoose
mongoose.connect(`${connectionURL}/task-manager-api`, { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true })

// tasks model
const Tasks = mongoose.model('Tasks',{
    description: { type: String, required: true, trim: true, required: true},
    completed: {type: Boolean, default: false}
})
