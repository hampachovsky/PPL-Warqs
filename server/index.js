import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './src/config/config.js';
import router from './src/routes/index.js';
import cors from 'cors';
import unknownEndpoint from './src/middleware/unknowEndpoint.js';
import tokenExtractor from './src/middleware/tokenExtractor.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(tokenExtractor);

// routers
app.use('/api', router);

app.use(unknownEndpoint);

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
