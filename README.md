# README

server.js and public/js/index.js code

## 1. server.js

Basic code to create a server and set the staic folder (not important for this analysis):

```js
'use strict';

const express = require('express');
require('dotenv').config();

const app = express();
const port = 8080;

// Set the location of where you want your static folder
app.use(express.static('./public'));

// app.get goes here

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
  console.log('Press Ctrl+C to end this process.');
});
```

app.get() code

```js
app.get('/api/photos', async (req, res) => {
  const API_BASE_URL = 'https://api.unsplash.com/photos/random/';
  const endpoint = `?client_id=${process.env.CLIENT_ID}`;
  try {
    const apiResponse = await fetch(API_BASE_URL + endpoint);
    const data = await apiResponse.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from Unsplash' });
  }
});
```

1. `'/api/photos'`: the name for our endpoint - `photos` for this code, but it could be anything. I removed `v1`, but that could be included also.
2. `async (req, res)`: setting the callback to async because we are makign a fetch to the Unsplash API
3. `API_BASE_URL` and `endpoint`: just cleaning up the URL for fetch.
4. `apiResponse` and `data`: self-explanatory
5. `res.json(data)`: This is the vital part that is returned/sent to getRandomPhoto

## 2. public/js/index.js

getRandomImage()

```js
async function getRandomImage() {
  const DOMAIN = 'http://localhost:8080';
  try {
    const response = await fetch(DOMAIN + '/api/photos');
    if (!response.ok) {
      throw new Error('Failed to fetch image.');
    }
    const data = await response.json();

    const photoUrl = data.urls.regular;
    console.log(photoUrl);

    const imgDiv = document.querySelector('.background-img');
    imgDiv.style.backgroundImage = `url(${photoUrl})`;
  } catch (err) {
    console.error(err);
  }
}
getRandomImage();
```

This is a standard function for a fetch call.

1. the code after `const data =` is particular to this project. That code could be anything, most commonly another function call that takes in `data` -> _IGNORE_
2. `fetch('http://localhost:8080/api/photos')`: This is what confused me.

```
RUNS FIRST:
http://localhost:8080/api/photos
1. getRandomPhoto fetches this URL which is the api point from server.js
2. If you visit that enpoint, you see the entire JSON response from Unsplash
3. const data = await response.json() -> res.json(data) from app.get() in server.js

https://api.unsplash.com/photos/random/?client_id=${process.env.CLIENT_ID}
1. server.js -> fetch to Unsplash with hidden API key
2. Initated by getRandomPhoto which runs on page load
3. res.json(data) is sent to getRandomPhoto
```

## The process

> ### You will be using the Fetch API twice!

1. Write your fetch function but with your API endpoint inside of fetch.
2. Create `app.get()` in your "main" JavaScript file (what is in `package.json`) with the first argument being equal to the API endpoint in step # 1 (minus the DOMAIN)
   1. Inside the fetch for `app.get`, include the Unsplash end point (or another API endpoint) with the `.env` value for the API key

That is it!

- Fetch is being used twice in 2 different locations with different values
- An API endpoint is created using Express and used in
  - app.get()
  - front-end function fetch call

```js
// your main/server JavaScript file
app.get('/your/api/path', async (req, res) => {
  const API_BASE_URL = 'domain_url';
  const endpoint = `api_endpoint`;
  try {
    const apiResponse = await fetch(API_BASE_URL + endpoint);
    const data = await apiResponse.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from Unsplash' });
  }
});

// the front end function
// /your/api/path -> from your main JS file, 1st arg in app.get()
async function someFunctionName() {
  const DOMAIN = 'local_dev_or_site_url';
  try {
    const response = await fetch(DOMAIN + '/your/api/path');
    if (!response.ok) {
      throw new Error('Failed to fetch from API.');
    }
    const data = await response.json();

    // do something with data here
  } catch (err) {
    console.error(err);
  }
}
someFunctionName();
```

The only variables you need:

server.js:

1. `/your/api/path`
2. `API_BASE_URL`
3. `endpoint`: including `process.env.CLIENT_ID`
4. `process.env.CLIENT_ID` from `.env` file

front-end function

1. `DOMAIN`: your `localhost` address or website
2. `/your/api/path` from server.js (or vice versa)

### Top Common Uses of Express.js

- Act as a proxy to hide API keys ✅ or handle CORS 📌
- Create your own API that returns JSON data 📌
- Add custom middleware for logging, validation, or error handling
- Connect to a database for full-stack apps
- Handle forms, authentication, and sessions
- Build RESTful APIs (CRUD) for mobile or frontend frameworks
- Serve static files (HTML, CSS, JS, images) ❓
- Use templating engines to generate dynamic HTML
