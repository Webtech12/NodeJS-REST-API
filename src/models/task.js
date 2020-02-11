const mongoose = require('mongoose')

// tasks model
const Tasks = mongoose.model('Tasks',{
    description: { type: String, required: true, trim: true, required: true},
    completed: {type: Boolean, default: false}
})

module.exports = Tasks