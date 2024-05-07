import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String
  },
  password: {
    type: String
  }
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
