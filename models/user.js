const mongoose = require("mongoose");
const joi = require("joi");

const db = mongoose.connection.useDb("AtlasMadness");

const userSchema = new mongoose.Schema({
  token: { type: String, required: true },
});

const userValidSchema = joi.object({
  token: joi.string().required(),
});

const User = db.model("User", userSchema);

// create a new audioaction
const createUser = async (body) => {
  const token = {
    token: body.token,
  };

  try {
    const newUser = new User(token);
    await newUser.save();
    console.log(`New user Data is successfully saved ==: ${newUser._id}`);
    return newUser._id;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

const readUserByToken = async (token) => {
  try {
    const users = await User.find({ token: token });
    return users;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

const getUserByToken = async (token) => {
  try {
    const user = await User.findOne({ token: token });
    return user;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

module.exports = {
  userValidSchema,
  createUser,
  readUserByToken,
  getUserByToken,
};
