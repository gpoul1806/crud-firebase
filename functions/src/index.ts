import * as functions from 'firebase-functions';
import server from './server';
import * as corsConfig from 'cors';

const cors = corsConfig({ origin: true });

const ping = functions.region('europe-west1').https.onRequest((request, response) => {
  cors(request, response, () => {
    response.status(200).send({ message: 'Pong' });
  });
});

const api = functions.region('europe-west1').https.onRequest(server);

export { ping, api };
