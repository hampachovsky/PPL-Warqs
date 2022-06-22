import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minLength: 2,
  },
  completed: {
    type: Boolean,
    default: false,
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

const Task = mongoose.model('Task', TaskSchema);

export default Task;
