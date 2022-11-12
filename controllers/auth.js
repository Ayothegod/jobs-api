const User = require('../models/User.js')
const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')

const register = async (req,res) => {
    const {name,email,password} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const temperUser = {name,email,password:hashedPassword}

    const user = await User.create({...temperUser})
    const token = jwt.sign({userId:user._id, name:user.name},"jaiasi92",{expiresIn:'30d'})
    // console.log(token);
    res.status(StatusCodes.CREATED).json({ user:{name:user.name},token })
}
const login = async (req,res) => {
    res.send(req.body)
}


module.exports = {register, login}