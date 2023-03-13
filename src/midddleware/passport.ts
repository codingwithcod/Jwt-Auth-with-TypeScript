import { Request } from "express";
import  { PassportStatic } from "passport";
import { Strategy } from "passport-jwt";
import { JWT_KEY } from "../config";
import User from "../models/User";

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies?.jwtAuth;
  }
  return jwt;
};

const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_KEY,
};

export default (passport: PassportStatic) => {
    passport.use(
        new Strategy(optionsCookie, async(payload, done) => {
            await User.findById(payload.userId)
                .then((user) => {
                    user ? done(null, user) : done(null, false)
                })
                .catch(() => done(null, false))

        })
    )
};