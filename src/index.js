import axios from 'axios';
import { TheCatAPI } from '@thatapicompany/thecatapi';
import { fetchCats, fetchId } from './cat-api';
import Notiflix from 'notiflix';
const API_KEY =
  'live_NwP4xUKbV2rba17j3AcMTN6zgFC0uFT4QWxszN8dq1flV330jBV5ZIFfYIUmx6Nc';
axios.defaults.headers.common['x-api-key'] = API_KEY;
const BASE_URL = 'https://api.thecatapi.com/v1';

const selectInput = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector(".loader");


function hideLoader() {
  loader.classList.add('hidden');
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideCatInfo() {
  info.classList.add('hidden');
}

function viewCatInfo() {
  info.classList.remove('hidden');
}

function hideSelector() {
  selectInput.classList.add('hidden');
}

function showSelector() {
  selectInput.classList.remove('hidden');
}





function hidetags() {
    hideSelector();
    showLoader();
    fetchCats()
      .then(cats => {
          catsMarkup(cats);
          hideLoader();
          showSelector();
      })
        .catch(error => {
            console.error('Error:', error);
            hideLoader();
            Notiflix.Notify.failure(
              'Oops! Something went wrong! Try reloading the page!'
            );
         });
    

}
function catsMarkup(cats) {
  const card = cats
    .map(cat => `<option value="${cat.id}">${cat.name}</option>`)
    .join('');
  selectInput.insertAdjacentHTML('beforeend', card);
}

function infoMarkup(cat) {
  const text = `<img src="${cat.url}" alt="${cat.breeds[0].name}" height="250px" width="400px">
                 <div class="text">
                  <h2 class="header">${cat.breeds[0].name}</h2>
                  <p class="description">${cat.breeds[0].description}</p>
                  <p class = "cat_temp"><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
                   </div>`;
  info.innerHTML = text;
}



  


selectInput.addEventListener('change', function (e) {
    const breedid = e.target.value;
    showLoader();
    hideCatInfo();
    fetchId(breedid)
        .then(data => {
            infoMarkup(data[0]);
             hideLoader();
             viewCatInfo();
        })
        .catch(error => {
            console.error('Error fetching cat info:', error)
            hideLoader();
            Notiflix.Notify.failure(
              'Oops! Something went wrong! Try reloading the page!'
            );
         });
    hideCatInfo();
});

hidetags();