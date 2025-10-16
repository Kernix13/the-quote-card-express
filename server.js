"use strict";

const express = require("express");
require("dotenv").config(); // Loads variables from .env file into process.env
const cors = require("cors");

const app = express();
const port = 8080;

const corsOptions = {
  origin: `http://localhost:${port}`,
};

app.use(cors(corsOptions));

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function getRandomImage() {
  const BASE_URL = 'https://api.unsplash.com/photos/random/';
  const endpoint = `?client_id=${process.env.CLIENT_ID}`;
  try {
    const response = await fetch(BASE_URL + endpoint);
    const returnedData = await response.json();
    const receivedPhotoUrl = returnedData.urls.regular;

    return receivedPhotoUrl;
  } catch (error) {
    console.error(error);
  }
}

app.use('/api/v1/getRandomImage', async (request, response) => {
  response.status(200).json({
    status: 200,
    data: await getRandomImage(),
  });
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
  console.log('Press Ctrl+C to end this process.');
}); 