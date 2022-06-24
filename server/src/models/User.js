import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 3, maxLength: 32, unique: true },
  password: { type: String, required: true, minLength: 4, maxLength: 64 },
  created: {
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
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
