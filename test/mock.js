const fetchCall = (url, params) => params.method + url;
const badFetch = (badUrl, params) => params.method + badUrl;

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/';
const badUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IV/scores/';

const params = {
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
};

const mockLeaderBoard = {
  result: [
    {
      user: 'Shrek',
      score: 2,
    },
    {
      user: 'Invincible',
      score: 35,
    },
    {
      user: 'Homelander',
      score: 10,
    },
  ],
};

export {
  fetchCall,
  badFetch,
  url,
  badUrl,
  params,
  mockLeaderBoard,
};