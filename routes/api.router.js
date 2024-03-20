import express from "express";
import usersRouter from "./api/users.router.js";
import cardsRouter from "./api/cards.router.js";
import handleError from "../utils/handleError.js";
// import env from "dotenv";
// import { OAuth2Client } from "google-auth-library";
const router = express.Router();
// env.config();

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);
router.use((req, res) => {
  handleError(res, 404, "not found");
});


export default router;
