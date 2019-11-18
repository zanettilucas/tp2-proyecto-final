const bodyParser = require('body-parser');
const express = require('express');
const env = require('dotenv').load();
const models = require('./models');
const controllers = require('./controllers');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // save the models in the context
  req.context = {
    models,
  };
  next();
});

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

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});

// Sync Database
// models.sequelize.sync().then(function() {

//   console.log('Nice! Database looks fine')

// }).catch(function(err) {

//   console.log(err, "Something went wrong with the Database Update!")

// }


// );

module.exports = app;
