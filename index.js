const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

app.get('/diamonds', async (req, res) => {
  const queryParams = req.query;
  const nivodaApiKey = process.env.NIVODA_API_KEY;

  try {
    const response = await axios.get('https://api.nivoda.net/v1/search', {
      headers: {
        'x-api-key': nivodaApiKey
      },
      params: queryParams
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching diamonds:', error.message);
    res.status(500).json({ error: 'Failed to fetch diamonds from Nivoda' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
