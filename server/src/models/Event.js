import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    minLength: 2,
  },
  eventType: {
    type: String,
    enum: ['minor', 'important', 'warning'],
    default: 'minor',
  },
  eventDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

EventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.author;
    delete returnedObject.tasks;
  },
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
