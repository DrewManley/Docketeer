const express = require('express');
const path = require('path');
const cors = require('cors');
const colors = require('colors');

// Routers
const signupRouter = require('./routes/signupRouter');
const loginRouter = require('./routes/loginRouter');
const adminRouter = require('./routes/adminRouter');
const accountRouter = require('./routes/accountRouter');
const apiRouter = require('./routes/apiRouter');
const dbRouter = require('./routes/dbRouter');
const initRouter = require('./routes/initRouter');
const logoutRouter = require('./routes/logoutRouter');
const settingsRouter = require('./routes/settingsRouter');

const app = express();

app.use(express.json()); // parses the request body
app.use(express.urlencoded({ extended: true })); // parses urlencoded payloads
app.use(cors()); // enables ALL cors requests

app.use('/test', (req, res) => {
  res.status(200).json({
    success: true
  });
});

app.use('/settings', settingsRouter);
app.use('/init', initRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/account', accountRouter);
app.use('/api', apiRouter);
app.use('/db', dbRouter);
app.use('/logout', logoutRouter);

// Unknown Endpoint Error Handler
app.use('/', (req, res) => {
  return res.status(404).json('404 Not Found');
});

// Global Error Handler
app.get('/', (req, res, next, err) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' }
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
