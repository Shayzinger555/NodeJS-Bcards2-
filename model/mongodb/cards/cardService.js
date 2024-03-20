import debug from "debug";
const log = debug("app:model:cardService");
import Card from "./Card.js";

//create
const createCard = async (cardData) => {
  const foundCards = await Card.find({ email: cardData.email });
  try {
    if (foundCards.length === 0) {
      let card = new Card(cardData);
      return card.save();
    } else {
      return null;
    }
  } catch (error) {
    log(error);
  }
};

//read
const getAllCards = () => {
  return Card.find();
};
//read
const getCardById = (id) => {
  console.log("id from ", id);
  return Card.findById(id);
};
const getCardByBizNumber = (bizNumber) => {
  return Card.findOne({ bizNumber });
};

const getAllMyCards = (user_id) => {
  return Card.find({ user_id });
};
//update
const updateCard = (id, cardData) => {
  return Card.findByIdAndUpdate(id, cardData, { new: true });
};

const updateLikeCard = (id, likes) => {
  return Card.findByIdAndUpdate(id, { likes }, { new: true });
  // return Card.findByIdAndUpdate(id, {likes: likes}, { new: true });
};
//delete
const deleteCard = (id) => {
  return Card.findByIdAndDelete(id);
};
export {
  createCard,
  getAllCards,
  getCardById,
  getCardByBizNumber,
  getAllMyCards,
  updateCard,
  updateLikeCard,
  deleteCard,
};
