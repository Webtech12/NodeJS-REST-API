const mongoose = require('mongoose')


// gtask schema
const taskSchema = new mongoose.Schema({
    description: { type: String, required: true, trim: true, required: true},
    completed: {type: Boolean, default: false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'}
},{
    timestamps:true
})


// tasks model
const Tasks = mongoose.model('Tasks',taskSchema)

module.exports = Tasks