import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/config.js';
import Task from '../models/Task.js';
import Event from '../models/Event.js';
import User from '../models/User.js';

const drop = async () => {
  await mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`connected to MongoDB at ${MONGODB_URI}`);
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message);
    });
  await Promise.all([Task.deleteMany({}), User.deleteMany({}), Event.deleteMany({})]);
};

drop();
