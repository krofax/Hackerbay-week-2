import users from '../controllers/users';

module.exports = (app, passport, db) => {
  app.get('/', (req, res) => {
    res.status(200).json({ status: 'success' });
  });

  app.get('/data', (req, res) => {
    const post_data = req.session.post_data;
    res.status(200).json({
      data: post_data || 'Please do a post request before get last post data',
    });
  });

  app.post('/data', (req, res) => {
    const { data } = req.body;
    req.session.post_data = data;

    res.status(200).json({ data: data });
  });

  app.post('/user/login', passport.authenticate('local'), users.login);
  app.post(
    '/user/signup',
    passport.authenticate('local-signup'),
    users.register
  );

  app.use((req, res, next) => {
    if (req.tokenPayload) {
      req.user = req.tokenPayload.id;
    }
    if (req.user) {
      return next();
    } else {
      return res.status(401).json({ status: 'error', code: 'unauthorized' });
    }
  });
};
