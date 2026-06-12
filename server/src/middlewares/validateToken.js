import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const token = req.cookies.token;

  console.log()

  if(!token) {
    return res.status(401).json({message: "Unauthorized"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decoded;
    next();
  }catch(err) {
    return res.status(401).json({message: "Unauthorized"});
  }
}