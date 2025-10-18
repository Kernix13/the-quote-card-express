'use strict';

const express = require('express');
require('dotenv').config();

const app = express();
const port = 8080;

app.use(express.static('./public'));

app.get('/api/photos', async (req, res) => {
  const BASE_URL = 'https://api.unsplash.com/photos/random/';
  const endpoint = `?client_id=${process.env.CLIENT_ID}`;
  try {
    const apiResponse = await fetch(BASE_URL + endpoint);
    const data = await apiResponse.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from Unsplash' });
  }
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
  console.log('Press Ctrl+C to end this process.');
});

/* takes care of sending raw json: */
// app.use(express.json());

/* to send form data: */
// app.use(express.urlencoded({ extended: false }));