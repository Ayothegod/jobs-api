const User = require('../models/User.js');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10

    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const temperUser = { name, email, password: hashedPassword };

    const user = await User.create({ ...temperUser });
    //token from moel
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ name: user.name,password:user.password, token });
  } catch (error) {
    res.send(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('PleASE INPUT EMAIL AND PASSWORD');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const deHash = await bcrypt.compare(password, user.password)
  if(!deHash) return res.status(400).send('password does not match')

  const token = user.createJWT();
  res.status(StatusCodes.OK).send({ user: { name: user.name }, token });
};

module.exports = { register, login };
