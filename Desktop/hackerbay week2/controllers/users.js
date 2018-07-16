require('dotenv').config();
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

module.exports = {
  login: (req, res) => {
    const { user } = req;
    res.status(200).json({ token: jwt.sign({ id: user.id }, secret) });
  },
  register: (req, res) => {
    const { user } = req;
    res.status(200).json({ token: jwt.sign({ id: user.id }, secret) });
    res.json(user);
  },
};
