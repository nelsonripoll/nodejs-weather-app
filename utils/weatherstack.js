const http = require('http');

const weather = ({latitude, longitude}, callback) => {
  const api = process.env.WEATHERSTACK_API;
  const key = process.env.WEATHERSTACK_KEY;
  const url = api + "/current?access_key=" + key + "&units=f&query=" + latitude + "," + longitude;

  const options = {
    headers: {
      'Content-Type' : 'application/json'
    }
  };

  const request = http.request(url, options, (response) => {
    let data = '';

    response.on('data', (chunk) => { 
      data += chunk.toString(); 
    });

    response.on('end', () => {
      const body = JSON.parse(data);

      if (data.error) { 
        callback("Unable to find location. Try another search.", undefined);
      } else {
        callback(undefined, {
          description: body.current.weather_descriptions[0],
          current_temperature: body.current.temperature,
          feels_like: body.current.feelslike
        });
      }
    });
  });

  request.on('error', (e) => {
    callback("Unable to connect to weatherstack services.\n" + e.message, undefined);
  });

  request.end();
};

module.exports = weather; 
