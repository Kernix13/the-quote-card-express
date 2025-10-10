"use strict"

const elements = {
    quote: document.getElementById("quote"),
    author: document.getElementById("author"),
};

/*
const quotes = [
    {
        quote: "The happiness of your life depends upon the quality of your thoughts.",
        author: "Marcus Aurelius"
    },
    {
        quote: "You are a living magnet. What you attract into your life is in harmony with your dominant thoughts.",
        author: "Brian Tracy"
    },
    {
        quote: "All men's miseries derive from not being able to sit in a quiet room – alone.",
        author: "Blaise Pascal"
    },
    {
        quote: "[He] who looks outside, dreams; who looks inside, awakens.",
        author: "Carl Jung"
    },
    {
        quote: "Go back into your past experiences of defeat & failure and bring to the surface some lesson by which you can regain all that you have lost.",
        author: "Napoleon Hill"
    },
    {
        quote: "The further a society drifts from the truth. the more it will hate those who speak it.",
        author: "George Orwell"
    },
    {
        quote: "The more reasons you have for achieving your goal, the more determined you will become.",
        author: "Brian Tracy"
    },
    {
        quote: "The Internet is the first thing that humanity has built that humanity doesn't understand, the largest experiment in anarchy that we have ever had.",
        author: "Eric Schmidt"
    }
];

function loopThroughQuotes() {
    let quoteIndex = 0;
    setInterval(() => {
        if (quoteIndex < quotes.length) {
            elements.quote.textContent = quotes[quoteIndex].quote;
            elements.author.textContent = quotes[quoteIndex].author;
            quoteIndex++;
        } else {
            quoteIndex = 0;
        }
    }, 3000);
}
setTimeout(loopThroughQuotes, 3000);
*/

/* Unsplash API */
async function getRandomImage() {
    const client_id = "YOUR_API_KEY";
    const endpoint = `https://api.unsplash.com/photos/random/?client_id=${client_id}`;
    try {
        const response = await fetch(endpoint);
        const returnedData = await response.json();
        const receivedPhotoUrl = returnedData.urls.regular;

        const imgDiv = document.querySelector(".background-img");
        imgDiv.style.backgroundImage = `url("${receivedPhotoUrl}")`;
    } catch (error) {
        console.error(error);
    }
}
// getRandomImage();