import mongoose from "mongoose";

const createSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
});

const Users = mongoose.model("User", createSchema);

export default Users
