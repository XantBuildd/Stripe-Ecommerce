export const cookieHelper = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "development",
  sameSite: "strict",
  maxAge: 3600000,
};
