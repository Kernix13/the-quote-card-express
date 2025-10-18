"use strict"

const elements = {
  quote: document.getElementById('quote'),
  author: document.getElementById('author'),
};

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