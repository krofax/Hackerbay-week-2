import bcrypt from 'bcrypt-nodejs';
import { Strategy } from 'passport-local';
const BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = (passport, db) => {
  passport.use(
    'local',
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        db.query(
          'SELECT id, email, password FROM users WHERE email=$1',
          [email],
          (err, result) => {
            if (err) return done(err);

            if (result.rows.length > 0) {
              const first = result.rows[0];
              const isValid = bcrypt.compareSync(password, first.password);

              if (isValid) {
                done(null, {
                  id: first.id,
                  email: first.email,
                });
              } else {
                return req.res.status(422).json({ error: 'Invlaid Password' });
              }
            } else {
              return req.res
                .status(404)
                .json({ error: 'User does not exist.' });
            }
          }
        );
      }
    )
  );
  passport.use(
    new BearerStrategy((token, cb) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return cb(err);
        db.query(
          'SELECT id, email FROM users WHERE email=$1',
          [username],
          (err, result) => {
            if (err) {
              return cb(err);
            }

            if (result.rows.length > 0) {
              const first = result.rows[0];

              cb(null, {
                id: first.id,
                email: first.email,
              });
            } else {
              cb(null, false);
            }
          }
        );
      });
    })
  );
  passport.use(
    'local-signup',
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        db.query(
          'SELECT COUNT(id) from users where email=$1',
          [email],
          (err, result) => {
            if (err) {
              return done(err);
            }
            if (result.rows.length > 0 && result.rows[0].count >= 1) {
              return req.res
                .status(422)
                .json({ error: 'User already exists.' });
            } else {
              db.query(
                'INSERT INTO users (email, password) VALUES ($1, $2)',
                [email, bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)],
                (err, result) => {
                  if (err) {
                    return done(err);
                  }

                  db.query(
                    'SELECT id, email FROM users WHERE email=$1',
                    [email],
                    (err, result) => {
                      if (err) {
                        return done(err);
                      }

                      if (result.rows.length > 0) {
                        const first = result.rows[0];
                        done(null, {
                          id: first.id,
                          email: first.email,
                        });
                      } else {
                        done(null, false);
                      }
                    }
                  );
                }
              );
            }
          }
        );
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    db.query(
      'SELECT id, email FROM users WHERE id = $1',
      [parseInt(id, 10)],
      (err, results) => {
        if (err) {
          return cb(err);
        }

        if (results.rowCount > 0) {
          cb(null, results.rows[0]);
        } else {
          cb(null, false);
        }
      }
    );
  });
};
