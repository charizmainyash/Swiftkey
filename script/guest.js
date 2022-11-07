const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
      .then(response => response.json())
      .then(data => data.content)
}
  
async function renderNewQuote() {
    startTimer()
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = quote
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()