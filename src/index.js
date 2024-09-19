import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
    'live_NwP4xUKbV2rba17j3AcMTN6zgFC0uFT4QWxszN8dq1flV330jBV5ZIFfYIUmx6Nc';
  const API_KEY =
    'live_NwP4xUKbV2rba17j3AcMTN6zgFC0uFT4QWxszN8dq1flV330jBV5ZIFfYIUmx6Nc';

const selectInput = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');

function fetchCats() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => console.error('Error fetching cat breeds:', error));
}

function catsMarkup(cats) {
  const card = cats
    .map(cat => `<option value="${cat.id}">${cat.name}</option>`)
    .join('');
  selectInput.innerHTML = card;
}


function infoMarkup(cat) {
  const text = `<img src="${cat.url}" alt="${cat.name}" style="max-width: 200px;">
                  <p>${cat.name}</p>`;
  info.innerHTML = text;
}


fetchCats()
  .then(cats => {
    catsMarkup(cats);
  })
  .catch(error => console.error('Error:', error));

selectInput.addEventListener('change', function (e) {
  const breedId = e.target.value;

  
  axios
    .get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
    )
    .then(response => {
      infoMarkup(response.data);
    })
    .catch(error => console.error('Error fetching cat info:', error));
});
