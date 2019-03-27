import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../models/user';

export default function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered.' });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            }

            return done(null, false, { message: 'Password incorrect' });
          });

          return new Error('An error was occured');
        })
        .catch(err => console.error(err));
    })
  );
}
