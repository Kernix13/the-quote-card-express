"use strict"

const elements = {
    quote: document.getElementById("quote"),
    author: document.getElementById("author"),
};

/* see week4.md for code that was here */

/* Unsplash API */ 
// server.js > getRandomImage
// 'https://api.unsplash.com/photos/random/' 

// js/index.js > getRandomImage
// 'http://localhost:8080/api/v1/getRandomImage'

async function getRandomImage() {
  const endpoint = 'http://localhost:8080/api/v1/getRandomImage';
  try {
    const response = await fetch(endpoint);
    const returnedData = await response.json();
    const receivedPhotoUrl = returnedData.data;

    const imgDiv = document.querySelector('.background-img');
    imgDiv.style.backgroundImage = `url(${receivedPhotoUrl})`;
  } catch (error) {
    console.error(error);
  }
}
getRandomImage();