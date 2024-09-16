import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  name: {
    type: String,
    minLength: 3,
  },
  lastName: {
    type: String,
    minLength: 3,
  },
  todo: [{ title: String, status: String }],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
