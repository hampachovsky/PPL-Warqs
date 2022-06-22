import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 3 },
  passwordHash: { type: String, required: true },
  created: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

const User = mongoose.model('User', UserSchema);

export default User;
