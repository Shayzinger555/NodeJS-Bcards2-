import handleError from "../utils/handleError.js";
import { verifyToken } from "../token/jwt.js";

const adminOrOwn = async (req, res, next) => {
  try {
    if (!req.headers.token) {
      throw new Error("you must provide a token");
    }

    const userData = await verifyToken(req.headers.token);
    console.log(userData);

    if (userData.isAdmin) {
      next();
    } else {
      handleError(res, 401, "you are not allowed to perform this action");
    }
  } catch (error) {
    handleError(res, 401, error.message);
  }
};

export default adminOrOwn;
