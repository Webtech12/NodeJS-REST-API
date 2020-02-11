const mongoose = require('mongoose')
const validator = require('validator')

// connection string
const connectionURL = 'mongodb://127.0.0.1:27017'

// connecting to MongoDB with mongoose
mongoose.connect(`${connectionURL}/task-manager-api`, { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true })

// // defining models
// const User = mongoose.model('User', {
//     name: {
//         type: String, required: true, trim: true, lowercase:true,
//     },
//     age: {
//         type: Number, minlength: 7, default: 0,
//         validate(value) {
//             if(value < 18) throw new Error("Age is under 18")
//         }
//     },
//     email:{
//         type: String, required: true, trim:true,
//         validate(value) {
//             if(!validator.isEmail(value)) throw new Error("not a valid email")
//         }
//     },
//     password:{
//         type: String, required: true, minlength: 7, trim: true,
//         validate(value) {
//             if(validator.equals(value,'password')) throw new Error("cannot save the word password")
//         }
//     },
// })

// // instantiating objects
// const me = new User({
//     name : 'User A',
//     age : 20,
//     email : 'abc@gg.com',
//     password : 'testing'
// })

// // saving models
// me.save().then(res => console.log(res)).catch(err => console.error(err.message))



// tasks model
const Tasks = mongoose.model('Tasks',{
    description: { type: String, required: true, trim: true, required: true},
    completed: {type: Boolean, default: false}
})

const task = new Tasks({
    description:'test 1',
    completed: true,
})

task.save().then(res => console.log(res)).catch(err => console.error(err.message))