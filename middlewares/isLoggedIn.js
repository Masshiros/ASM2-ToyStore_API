import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
  // get token from the header
  const token = getTokenFromHeader(req);
  // verify token
  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    throw new Error("Invalid/Expired token, please login again");
  } else {
    // save the user into req obj
    req.userAuthID = decodedUser?.id;
    next();
  }
};
