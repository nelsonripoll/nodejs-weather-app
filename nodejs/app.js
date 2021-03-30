require('dotenv').config();

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

// define paths for express
const publicPath = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');
const utilsPath = path.join(__dirname, '/utils');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    createdBy: 'Nelson Ripoll'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    message: 'sample about message',
    createdBy: 'Nelson Ripoll'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'sample help message',
    createdBy: 'Nelson Ripoll'
  });
});

app.get('/weather', (req, res) => {
  const geocode = require(utilsPath + '/mapbox.js');
  const weather = require(utilsPath + '/weatherstack.js');

  if (!req.query.location) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  geocode(req.query.location, (error, {location, latitude, longitude} = {}) => {
    if (error) {
      return res.send({ error });
    }

    weather({latitude, longitude}, (error, {description, current_temperature, feels_like}) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        latitude,
        longitude,
        weather: {
          description,
          current_temperature,
          feels_like
        }
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('error404', {
    title: '404 Not Found',
    message: 'help article not found',
    createdBy: 'Nelson Ripoll'
  });
});

app.get('*', (req, res) => {
  res.render('error404', {
    title: '404 Not Found',
    message: 'page not found',
    createdBy: 'Nelson Ripoll'
  });
});

app.listen(process.env.PORT, ()=> {
  console.log('Server is up on port ' + process.env.PORT);
});
