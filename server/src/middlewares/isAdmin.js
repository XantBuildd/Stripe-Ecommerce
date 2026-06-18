import User from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user?.role === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Admin access required",
  });
};
