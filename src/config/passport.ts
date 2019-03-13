import { Strategy as LocalStrategy } from "passport-local";

import { default as User, UserModel } from "../models/user";

export default function (passport: any) {
  passport.serializeUser((user: UserModel, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "That email is not registered." });
          }

          // Match password
          user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            }

            return done(null, false, { message: "Password incorrect" });
          });
        })
        .catch((err) => {
          return console.log(err);
        });
    }),
  );
}
