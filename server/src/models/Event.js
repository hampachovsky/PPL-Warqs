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
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

EventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
