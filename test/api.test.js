import * as apiMock from './mock';
import 'regenerator-runtime/runtime';

describe('valid game created ', () => {
  const response = { result: 'Leaderboard score created correctly.' };

  const mockUpload = jest.fn().mockImplementation((url, params, name, scores) => {
    expect(url).toContain('Zl4d7IVkemOTTVg2fUdz');

    params.method = 'POST';
    apiMock.fetchCall(url, params);

    const data = { user: name, score: scores };

    apiMock.mockLeaderBoard.result.push(data);

    return Promise.resolve({
      json: () => Promise.resolve(response),
    });
  });

  test('Leaderboard score created correctly', async () => {
    const data = await mockUpload(apiMock.url, apiMock.params, 'UserName', 10);
    expect(data).toBeInstanceOf(Object);
  });

  test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
      await mockUpload(apiMock.url, apiMock.params, 'UserName', 10);
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});

describe('get the leaderboard from API call', () => {
  const unsorted = apiMock.mockLeaderBoard.result;

  const mockGetRankings = jest.fn().mockImplementation((url, params) => {
    expect(url).toContain('Zl4d7IVkemOTTVg2fUdz');

    params.method = 'GET';

    apiMock.fetchCall(url, params);

    return Promise.resolve({
      json: () => Promise.resolve(unsorted),
    });
  });

  test('Leaderboard score created correctly', async () => {
    const data = await mockGetRankings(apiMock.url, apiMock.params);
    expect(data).toBeInstanceOf(Object);
  });

  test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
      await mockGetRankings(apiMock.url, apiMock.params);
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});