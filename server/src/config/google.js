import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL:
        "stripe-ecommerce-production.up.railway.app/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        email: profile.emails[0].value,
      });

      if (!user) {
        user = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          avatar: { url: profile.photos[0].value },
          provider: "google",
        });

        await Cart.create({
          user: user._id,
          items: [],
        });
      }

      done(null, user);
    },
  ),
);
