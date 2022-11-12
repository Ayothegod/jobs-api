const mongoose = require('mongoose')

const connectDB = () => {
  const conn = mongoose.connect(process.env.MONGO_URI)
  console.log('database connected is connected');
}

module.exports = connectDB
