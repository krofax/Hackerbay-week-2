import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import ejwt from 'express-jwt';
import routes from './config/routes';
import passport from 'passport';
import passportConfig from './config/passport';
import db from './config/db';
const app = express();
const PORT = process.env.PORT || 8081;
const secret = process.env.SECRET_KEY;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(
  session({
    secret: secret,
  })
);

passportConfig(passport, db);
routes(app, passport, db);

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = server;
