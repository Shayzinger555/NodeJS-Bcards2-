import User from "./User.js";
import debug from "debug";
const log = debug("userService");
// Register
const createUser = (userData) => {
  let user = new User(userData);
  return user.save();
};
const getUserByEmail = (email) => {
  return User.findOne({ email });
};
const findOrCreateUser = async (userData) => {
  let user = await getUserByEmail(userData.email);
  try {
    if (!user) {
      user = new User(userData);
      return user.save();
    } else {
      return null;
    }
  } catch (error) {
    log(error);
  }
};

const getAllUsers = () => {
  return User.find({}, { password: 0 });
};

const getUserById = (id) => {
  return User.findById(id, { password: 0 });
};

const updateUser = (id, userData) => {
  return User.findByIdAndUpdate(id, userData, { new: true });
};

const patchIsBiz = (id, newStatus) => {
  return User.findByIdAndUpdate({ _id: id }, { isBusiness: newStatus });
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

export {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  patchIsBiz,
  findOrCreateUser,
  // createOrGetGoogleUser,
};
