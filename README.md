# NodeJS Weather App

This is a simple express app that uses MapBox for geocoding and WeatherStack 
 to get the current weather for a location provided by the user. In order for
 this app to work, you will need an api key for both services. Once you have
 those keys, assign them to MAPBOX\_KEY and WEATHERSTACK\_KEY environment
 variables in default.env, then rename that file to .env.

To run the application, you will need to either add a PORT variable to .env or
 set it on the command line when running app.js.

```
PORT=3000 node app.js
```

Or if you prefer the npm start script...

```
PORT=3000 npm run start
```

## Nodemon

Watch extensions ```.js``` and ```.hbs```.

```
PORT=3000 nodemon app.js --ext js,hbs
```

## Buildah & Podman

```
buildah bud -t nodejs-weather-app .
podman run -dt -p 3000:3000 --name nodejs-weather-app localhost/nodejs-weather-app
```
