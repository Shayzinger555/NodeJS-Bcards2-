import express from "express";
import {
  createCardController,
  deleteCardController,
  getAllCardsController,
  getCardByIdController,
  getMyCardsController,
  patchBizNumberController,
  patchLikeController,
  updateCardController,
} from "../../controllers/cards.controller.js";
import objectIdParamsValidationMiddleware from "../../middlewares/objectIdParamsValidation.mw.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import isBizMiddleware from "../../middlewares/isBiz.mw.js";
import bodyValidationMiddleware from "../../middlewares/bodyValidation.mw.js";
import createCardSchemaValidation from "../../validation/joi/cards/card.validation.js";
import adminOrBizMiddleware from "../../middlewares/adminOrBiz.mw.js";
import isAdminMiddleware from "../../middlewares/isAdmin.mw.js";
const router = express.Router();

// Create a card
router.post(
  "/",
  authMiddleware,
  isBizMiddleware,
  bodyValidationMiddleware(createCardSchemaValidation),
  createCardController
);
// get all cards
router.get("/", getAllCardsController);

// get my Cards
router.get("/my-cards", authMiddleware, getMyCardsController);

// Edit card
router.put(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrBizMiddleware,
  bodyValidationMiddleware(createCardSchemaValidation),
  updateCardController
);

router.get("/:id", objectIdParamsValidationMiddleware, getCardByIdController);

router.patch(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  patchLikeController
);

router.patch(
  "/biz-number/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  isAdminMiddleware,
  patchBizNumberController
);

router.delete(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrBizMiddleware,
  deleteCardController
);

export default router;
  