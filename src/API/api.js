import 'regenerator-runtime/runtime';

const api = (() => {
  const key = 'Zl4d7IVkemOTTVg2fUdz';

  const ScoreList = async () => {
    try {
      const scores = await fetch(
        `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      return scores.json();
    } catch (error) {
      return error.json();
    }
  };

  const submit = async (name, score) => {
    try {
      const result = await fetch(
        "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games",
        {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: 'Sky Man' }),
        },
      );

      return result.json();
    } catch (error) {
      return error.json();
    }
  };

  return { submit, ScoreList };
})();

export default api;