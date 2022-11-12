const User = require('../models/User.js')
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')

const register = async (req,res) => {
    const {name,email,password} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const temperUser = {name,email,password:hashedPassword}

    const user = await User.create({...temperUser})
    // if(req.body.email == User.email) return res.send('email exist')
    res.status(StatusCodes.CREATED).json({  user })
}
const login = async (req,res) => {
    res.send(req.body)
}


module.exports = {register, login}