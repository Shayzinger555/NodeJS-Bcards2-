import {
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  patchIsBiz,
} from "../model/mongodb/users/userService.js";
import handleError from "../utils/handleError.js";
import { generateHash, cmpHash } from "../utils/bcrypt.js";
import { generateToken } from "../token/jwt.js";
import debug from "debug";
const log = debug("app:users.controller");

const registerController = async (req, res) => {
  try {
    let userFromDB = await getUserByEmail(req.body.email);
    if (userFromDB) throw new Error("user already exists");
    let passwordHash = await generateHash(req.body.password);
    req.body.password = passwordHash;
    let newUser = await createUser(req.body);
    newUser.password = undefined;
    res.json(newUser);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const loginController = async (req, res) => {
  try {
    let userFromDB = await getUserByEmail(req.body.email);
    if (!userFromDB) throw new Error("invalid email or password");
    let passwordMatch = await cmpHash(req.body.password, userFromDB.password);
    if (!passwordMatch) throw new Error("invalid email or password");
    let token = await generateToken({
      _id: userFromDB._id,
      isAdmin: userFromDB.isAdmin,
      isBusiness: userFromDB.isBusiness,
    });
    res.json(token);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const getAllUsersController = async (req, res) => {
  try {
    let allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};
const updateUserController = async (req, res) => {
  console.log(req.headers);
  try {
    let userFromDB = await updateUser(req.params.id, req.body);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const patchIsBizController = async (req, res) => {
  try {
    let oldUserData = await getUserById(req.params.id);
    let oldStatus = oldUserData.isBusiness;
    let newStatus = !oldStatus;
    let newUserFromDB = await patchIsBiz(req.params.id, newStatus);
    newUserFromDB.password = undefined;
    res.json(newUserFromDB);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const deleteUserController = async (req, res) => {
  try {
    let userFromDB = await deleteUser(req.params.id);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};
const getUserController = async (req, res) => {
  let userFromDB = await getUserById(req.params.id);
  res.json(userFromDB);
  try {
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};
export {
  loginController,
  registerController,
  updateUserController,
  deleteUserController,
  patchIsBizController,
  getUserController,
  getAllUsersController,
};
