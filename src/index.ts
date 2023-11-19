import express from 'express';
import App from './services/expressApp'
import DBConnection from './config/database'
import { PORT } from './config/env';

const StartServer = async () => {

  const app = express()
  await DBConnection()
  await App(app)
  app.listen(PORT || 3030, () => {
    console.log(`Listening on port ${PORT}`);
  })
}


StartServer()