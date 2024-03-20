import express from "express";
import {
  registerController,
  deleteUserController,
  loginController,
  updateUserController,
  patchIsBizController,
  getAllUsersController,
  getUserController,
} from "../../controllers/users.controller.js";
import bodyValidationMiddleware from "../../middlewares/bodyValidation.mw.js";
import {
  loginValidation,
  registerValidation,
  editUserValidation,
} from "../../validation/validationAdapter.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import adminOrOwn from "../../middlewares/adminOrOwn.mw.js";
import objectIdParamsValidationMiddleware from "../../middlewares/objectIdParamsValidation.mw.js";
import isAdminMiddleware from "../../middlewares/isAdmin.mw.js";
import loginLimiter from "../../middlewares/loginLimiter.mw.js";
const router = express.Router();

// register
router.post(
  "/register",
  bodyValidationMiddleware(registerValidation),
  registerController
);
// login
router.post(
  "/login",
  loginLimiter,
  bodyValidationMiddleware(loginValidation),
  loginController
);
// get all users (CRM)
router.get("/", isAdminMiddleware, getAllUsersController);
// get user
router.get("/:id", adminOrOwn, getUserController);
// Edit user
router.put(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  bodyValidationMiddleware(editUserValidation),
  updateUserController
);

router.patch(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  patchIsBizController
);

router.delete(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  deleteUserController
);

export default router;
