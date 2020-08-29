const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const autherText = document.getElementById('auther');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quotefrom API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        
        // If auther is blank add unknown
        if (data.quoteAuthor === ""){
            autherText.innerText = "Unknown";
        } else {
            autherText.innerText = data.quoteAuthor;
        }
        // Reduce font size if quote is long 
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        // Stop loader, show quote
        hideLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}

// Tweet Quote
function tweetQuote () {
    const quote = quoteText.innerText;
    const auther = autherText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${auther}`;

    window.open(twitterUrl, '_blank');

}

// Even Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();