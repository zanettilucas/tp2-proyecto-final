// import models from './models';
const bodyParser = require('body-parser');
const express = require('express');
const controllers = require('./controllers');
var distance = require('google-distance-matrix');

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

var origins = ['-34.609999, -58.429088'];
var destinations = ['-34.603651, -58.381678'];


distance.key('AIzaSyDSDU_29QYkLeBel6eA_7qygQ7A8M8bayk')
 
distance.matrix(origins, destinations, function (err, distances) {
  if (err) {
      return console.log(err);
  }
  if(!distances) {
      return console.log('no distances');
  }
  if (distances.status == 'OK') {
      for (var i=0; i < origins.length; i++) {
          for (var j = 0; j < destinations.length; j++) {
              var origin = distances.origin_addresses[i];
              var destination = distances.destination_addresses[j];
              if (distances.rows[0].elements[j].status == 'OK') {
                  var distance = distances.rows[i].elements[j].distance.text;
                  var duration = distances.rows[i].elements[j].duration.text;
                  console.log('La distancia desde: ' + origin + ' hasta: ' + destination + ' es ' + distance + ' / ' + duration);
              } else {
                  console.log(destination + ' is not reachable by land from ' + origin);
              }
          }
      }
  }
});

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
// Controllers.initializeRoutes(app);

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

//Sync Database
// models.sequelize.sync().then(function() {
 
//   console.log('Nice! Database looks fine')

// }).catch(function(err) {

//   console.log(err, "Something went wrong with the Database Update!")

// }


//);
