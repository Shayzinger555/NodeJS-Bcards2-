import {
  createCard,
  deleteCard,
  getAllCards,
  getAllMyCards,
  getCardById,
  updateCard,
  updateLikeCard,
} from "../model/mongodb/cards/cardService.js";
import handleError from "../utils/handleError.js";
import { verifyToken } from "../token/jwt.js";
import generateUniqueNumber from "../utils/generateUniqueNumber.js";
import debug from "debug";
const log = debug("app:cards.controller");

const getAllCardsController = async (req, res) => {
  try {
    let cards = await getAllCards();
    res.json(cards);
    log(cards);
  } catch (err) {
    log(err);
  }
};

const getCardByIdController = async (req, res) => {
  try {
    let card = await getCardById(req.params.id);
    res.json(card);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};
// get my cards
const getMyCardsController = async (req, res) => {
  const userData = await verifyToken(req.headers.token);
  const userId = req.userData._id;
  try {
    let myCards = await getAllMyCards(userId);
    return res.json(myCards);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const createCardController = async (req, res) => {
  try {
    const userData = await verifyToken(req.headers.token);
    log(userData);
    const userId = userData._id;
    req.body.user_id = userId;
    const bizNumber = await generateUniqueNumber();
    req.body.bizNumber = bizNumber;
    let newCard = await createCard(req.body);
    return res.json(newCard);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const updateCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    let { user_id } = cardFromDb;
    user_id = user_id + "";
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    if (req.userData.isBusiness && req.userData._id !== user_id) {
      throw new Error(
        "You are not allowed to update this card, you must be the owner of the card"
      );
    }
    const updatedCard = await updateCard(req.params.id, req.body);
    return res.json(updatedCard);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const patchLikeController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let likes = [...cardFromDb.likes];
    if (likes.includes(req.userData._id)) {
      likes = likes.filter((id) => id !== req.userData._id);
    } else {
      likes.push(req.userData._id);
    }
    const updatedCardFromDb = await updateLikeCard(req.params.id, likes);
    console.log("updatedCardFromDb", updatedCardFromDb);
    return res.json(updatedCardFromDb);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const patchBizNumberController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    //
    cardFromDb.bizNumber = req.body.bizNumber;
    let updatedCard = await updateCard(req.params.id, cardFromDb);
    return res.json(updatedCard);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const deleteCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let { user_id } = cardFromDb;
    user_id = user_id + "";
    if (req.userData.isBusiness && req.userData._id !== user_id) {
      throw new Error(
        "You are not allowed to update this card, you must be the owner of the card"
      );
    }
    const cardAfterDeleteFromDb = await deleteCard(req.params.id);
    return res.json(cardAfterDeleteFromDb);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

export {
  getAllCardsController,
  getCardByIdController,
  getMyCardsController,
  createCardController,
  updateCardController,
  patchLikeController,
  patchBizNumberController,
  deleteCardController,
};
