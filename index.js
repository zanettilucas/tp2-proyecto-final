// import models from './models';
const bodyParser = require('body-parser');
const express = require('express');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* descomentar cuando models tenga algo.
app.use((req, res, next) => {
  // save the models in the context
  req.context = {
    models,
  };
  next();
});
*/
// --- Response standardization
app.use((req, res, next) => {
  res.sendData = function sendData(data) {
    const response = {
      status: 200,
      data,
    };
    res.send(response);
  };
  next();
});

// --- Controllers / Routes
controllers.initializeRoutes(app);

// --- Error handling
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// app.listen(config.port, () => {
app.listen(3000, () => {
//    console.log(`Express server listening on port ${config.port}`);
  console.log('Express server listening on port 3000');
});
