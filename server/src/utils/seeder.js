import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { MONGODB_URI } from '../config/config.js';
import bcrypt from 'bcryptjs';
import Event from '../models/Event.js';
import User from '../models/User.js';
import Task from '../models/Task.js';
import { random } from './helper.js';

const typeOfEvent = ['minor', 'important', 'warning'];

const seeder = async () => {
  await Promise.all([Event.deleteMany({}), User.deleteMany({}), Task.deleteMany({})]);

  let eventAuthors = [];
  let taskParent = [];
  let tasksToInsert = [];
  let eventsToInsert = [];

  for (let i = 0; i < 12; i++) {
    eventAuthors.push(new mongoose.Types.ObjectId());
  }

  for (let i = 0; i < 120; i++) {
    taskParent.push(new mongoose.Types.ObjectId());
  }

  for (let i = 0; i < 1200; i++) {
    const taskToAdd = {
      text: faker.lorem.words(random(4, 10)),
      event: taskParent[random(0, taskParent.length - 1)],
    };
    tasksToInsert.push(new Task({ ...taskToAdd }));
  }

  for (let i = 0; i < taskParent.length; i++) {
    let tasks = [];
    for (let j = 0; j < 10; j++) {
      tasks.push(tasksToInsert[i * 10 + j]);
    }
    const eventToAdd = {
      title: faker.lorem.words(random(2, 6)),
      text: `${faker.lorem.paragraphs()}`,
      author: eventAuthors[random(0, eventAuthors.length - 3)], //-3 cuz 2 custom users
      eventDate: faker.date.between('2022-06-01T00:00:00.000Z', '2022-08-01T00:00:00.000Z'),
      eventType: typeOfEvent[random(0, 2)],
      tasks,
    };
    eventsToInsert.push(new Event({ ...eventToAdd, _id: taskParent[i] }));
  }

  let authorsToInsert = [];
  for (let i = 0; i < eventAuthors.length - 1; i++) {
    // TODO: CHANGE FOR RANDOM PASSWORD
    // const password = faker.lorem.word(random(4, 10));
    const passwordHash = bcrypt.hashSync('user', 10);
    let events = [];
    for (let j = 0; j < 10; j++) {
      events.push(eventsToInsert[i * 10 + j]);
    }
    const userToAdd = {
      username: faker.internet.userName(),
      password: passwordHash,
      events,
    };
    authorsToInsert.push({ ...userToAdd, _id: eventAuthors[i] });
  }
  const adminHash = bcrypt.hashSync('admin', 10);
  const defaultUserHash = bcrypt.hashSync('defaultUser', 10);
  const admin = {
    username: 'admin',
    password: adminHash,
  };
  const defaultUser = {
    username: 'defaultUser',
    password: defaultUserHash,
  };
  authorsToInsert.push(admin);
  authorsToInsert.push(defaultUser);

  await Promise.all([
    Task.insertMany(tasksToInsert, (error) => {
      if (error) console.log(error);
    }),
    Event.insertMany(eventsToInsert, (error) => {
      if (error) console.log(error);
    }),
    User.insertMany(authorsToInsert, (error) => {
      if (error) console.log(error);
    }),
  ]);
  console.log('seeded');
};

const connect = async () => {
  await mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`connected to MongoDB at ${MONGODB_URI}`);
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message);
    });
};
const wrapper = async () => {
  await connect();
  await seeder();
  console.log('database is made of seed');
  //process.exit()
  //await mongoose.connection.close()
};

wrapper();
