const _ = require('lodash');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh';

module.exports = {
  register: async (req, res) => {
    try {
      const body = _.pick(req.body, ['email', 'password']);
      const user = new User(body);
      await user.save();
      res.status(200).send('User successfully registered');
    } catch (e) {
      res.status(500).send('Error registering. Please try again.');
    }
  },
  authenticate: async (req, res) => {
    var { email, password } = _.pick(req.body, ['email', 'password']);
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password',
      });
      return;
    }

    await user.isCorrectPassword(password, function (err, same) {
      if (err) {
        res.status(500).json({
          error: 'Internal error please try again',
        });
      } else if (!same) {
        res.status(401).json({
          error: 'Incorrect email or password',
        });
      } else {
        const userId = user._id.toString();
        const payload = { email };
        const token = jwt.sign(payload, secret, {
          expiresIn: '1h',
        });
        res.cookie('token', token, { httpOnly: true });
        res.cookie('userId', userId, { httpOnly: true }).sendStatus(200);
      }
    });
  },
  checkToken: async (req, res) => {
    res.sendStatus(200);
  },
  logOut: async (req, res) => {
    res.clearCookie('token', { httpOnly: true });
    res.clearCookie('userId', { httpOnly: true }).sendStatus(200);
  },
};
