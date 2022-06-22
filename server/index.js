import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './config/config.js';

const app = express();
app.use(express.json());

async function startApp() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  } catch (e) {
    console.error(e);
  }
}

startApp();
