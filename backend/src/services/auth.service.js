import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Account already exists. Try logging in.");
  }
  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);
  return { user, token };
};
