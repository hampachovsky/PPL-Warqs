import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './src/config/config.js';
import router from './src/routes/index.js';
import cors from 'cors';
// import drop from './src/utils/dropDB.js';

const app = express();
app.use(express.json());
app.use(cors());

// routers
app.use('/api', router);

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
