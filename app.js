require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB  = require('./db/connect.js')

//routes
const logRouter = require('./routes/auth.js')
const Router = require('./routes/jobs.js')
const auth = require('./middleware/authentication.js')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', logRouter);
app.use('/api/v1/jobs', auth ,Router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3003;

const start = async () => {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    });
  } catch (error) {
    console.log(error);
  }
};

start();
