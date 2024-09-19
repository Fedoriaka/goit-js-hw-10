const API_KEY =
  'live_NwP4xUKbV2rba17j3AcMTN6zgFC0uFT4QWxszN8dq1flV330jBV5ZIFfYIUmx6Nc';
const BASE_URL = 'https://api.thecatapi.com/v1';
function fetchCats() {
  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function fetchId(id) {
  return fetch(
    `${BASE_URL}/images/search?&breed_ids=${id}&api_key=${API_KEY}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchCats, fetchId };