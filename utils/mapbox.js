const https = require('https');

const geocode = (search, callback) => {
  const api = process.env.MAPBOX_API;
  const key = process.env.MAPBOX_KEY;
  const url = api + "/geocoding/v5/mapbox.places/" + search + ".json/?types=place,region,country&limit=1&access_token=" + key;

  const options = {
    headers: {
      'Content-Type' : 'application/json'
    }
  };

  const request = https.request(url, options, (response) => {
    let data = '';

    response.on('data', (chunk) => { 
      data += chunk.toString(); 
    });

    response.on('end', () => {
      const body = JSON.parse(data);

      if (body.error || body.features.length == 0) { 
        callback("Unable to find location. Try another search.", undefined);
      } else {
        callback(undefined, {
          longitude: body.features[0].center[0],
          latitude:  body.features[0].center[1],
          location:  body.features[0].place_name
        });
      }
    });
  });

  request.on('error', (e) => {
    callback("Unable to connect to mapbox services.", undefined);
  });

  request.end();
};

module.exports = geocode; 
