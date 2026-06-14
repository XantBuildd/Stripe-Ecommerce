import jwt from "jsonwebtoken";

export const jwtSign = ({ id }) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};
