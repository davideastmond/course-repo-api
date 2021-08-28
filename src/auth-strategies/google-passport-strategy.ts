import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { UserModel } from "../models/user/user.model";
import {
  getUserFromGoogleData,
  IGoogleData,
} from "../models/utils/create-user-from-google-data";

passport.serializeUser((user: any, done: any) => {
  done(undefined, user.id);
});

passport.deserializeUser((id: string, done) => {
  UserModel.findById(id)
    .then((user) => {
      done(undefined, user);
    })
    .catch((err) => {
      done(err, undefined);
    });
});

async function authenticateUser(
  _accessToken: any,
  _refreshToken: any,
  profile: IGoogleData,
  done: any
) {
  try {
    const user = await UserModel.findOneByGoogleIdOrCreate(
      getUserFromGoogleData(profile)
    );
    done(undefined, user);
  } catch (err) {
    done(err, undefined);
  }
}

const GooglePassportStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:5000/api/auth/google/callback`,
  },
  authenticateUser
);

export default GooglePassportStrategy;
