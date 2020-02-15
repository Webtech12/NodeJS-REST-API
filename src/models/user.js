const mongoose = require('mongoose')
const validator = require('validator')

// defining models
const User = mongoose.model('User', {
    name: {
        type: String, required: true, trim: true, lowercase:true,
    },
    age: {
        type: Number, minlength: 7, default: 0,
        validate(value) {
            if(value < 0) throw new Error("Age is under 18")
        }
    },
    email:{
        type: String, required: true, trim:true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error("not a valid email")
        }
    },
    password:{
        type: String, required: true, minlength: 7, trim: true,
        validate(value) {
            if(validator.equals(value,'password')) throw new Error("cannot save the word password")
        }
    },
})

module.exports = User