const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide valid email'
        ],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Please provide pasword'],
        minlength:6,
        maxlength:100
    }
})

userSchema.methods.createJWT = function (){
    return jwt.sign({ userId:this._id, name:this.name},process.env.JWT_SECRET, { expiresIn:process.env.JWT_LIFETIME,})
}

module.exports = mongoose.model('User', userSchema)