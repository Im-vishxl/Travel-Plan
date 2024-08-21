const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const geoCodeApiKey = process.env.geo_code_api_key;
const GEO_API_URL = 'http://api.positionstack.com/v1/forward';

const routeApiKey = process.env.ROUTING_API_KEY;

app.get('/', (req, res) => {
  res.send('Welcome to the server hello world');
});

app.post('/api/geocode', async (req, res) => {
  const { addresses } = req.body;
  const coordinates = [];

  try {
    for (let address of addresses) {
      const response = await axios.get(GEO_API_URL, {
        params: {
          access_key: geoCodeApiKey,
          query: address
        }
      });

      const results = response.data.data;
      if (results.length > 0) {
        const { latitude, longitude } = results[0];
        coordinates.push({ lat: latitude, lng: longitude });
      }
    }
    
    const formattedCoordinates = coordinates.map(coord => [coord.lng, coord.lat]);
    res.json(formattedCoordinates);
  } catch (error) {
    console.error('Error fetching geocoding data:', error.message);
    res.status(500).json({ error: 'Failed to fetch geocoding data' });
  }
});

// app.post('/api/route', async (req, res) => {
//   const { coordinates } = req.body;

//   try {
//     const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

//     const response = await axios.post(url, {
//       coordinates,
//     }, {
//       headers: {
//         'Authorization': routeApiKey,  
//         'Content-Type': 'application/json'
//       }
//     });

//     const routeData = response.data;
//     res.json(routeData);
//   } catch (error) {
//     console.error('Error fetching route:', error.response ? error.response.data : error.message);
//     res.status(500).send('Error fetching route');
//   }
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
