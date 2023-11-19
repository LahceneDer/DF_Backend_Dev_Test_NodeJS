import express from 'express';
import App from './services/expressApp'
import { PORT } from './config/env';

const StartServer = async () => {

  const app = express()
  await App(app)
  app.listen(PORT || 3030, () => {
    console.log(`Listening on port ${PORT}`);
  })
}


StartServer()