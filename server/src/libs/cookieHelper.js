export const cookieHelper = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "develpment",
  sameSite: "strict",
  maxAge: 3600000,
};
