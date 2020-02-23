const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// model schema


// defining models

// Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true, lowercase: true,
    },
    age: {
        type: Number, minlength: 7, default: 0,
        validate(value) {
            if (value < 0) throw new Error("Age is under 18")
        }
    },
    email: {
        type: String, required: true, trim:true, unique:true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("not a valid email")
        }
    },
    password: {
        type: String, required: true, minlength: 7, trim: true,
        validate(value) {
            if (validator.equals(value, 'password')) throw new Error("cannot save the word password")
        }
    },
    tokens: [{
        token: {
            type: String, required: true,
        }
    }],
})


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'abc')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}


userSchema.statics.fetchByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) throw new Error('Unable to login')

    const isMatched = await bcrypt.compare(password, user.password)
    if(!isMatched) throw new Error('Unable to login')

    return user
}


// userSchema.virtual('tasks',{

// })


userSchema.pre('save', async function(next) {
    
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 8) 

    next()
  })




// defining models
const User = mongoose.model('User',userSchema)

module.exports = User