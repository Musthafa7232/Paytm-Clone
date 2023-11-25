import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()
export const createUserToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY_USER);
  return token;
};

export const verifyUserToken = (req, res, next) => {
  const Token = req.header("auth-token");
  if (!Token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(Token, process.env.SECRET_KEY_USER);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid Token");
  }
};

