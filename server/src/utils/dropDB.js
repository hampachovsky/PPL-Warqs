import mongoose from 'mongoose';
import 'dotenv/config';
import Task from '../models/Task.js';
import Event from '../models/Event.js';
import User from '../models/User.js';

const drop = async () => {
  try {
    await Promise.all([Task.deleteMany({}), User.deleteMany({}), Event.deleteMany({})]);
    console.log('All Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

drop();

export default drop;
