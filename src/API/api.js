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
      throw error
    }
  };

  const submit = async (name, score) => {
    try {
      const result = await fetch(
        `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: name,
            score: Number(score),
          }),
        },
      );

      const responseObj = await result.json();
      return responseObj;
    } catch(error) {
      throw Error
    }
  };

  return { submit, ScoreList };
})();

export default api;