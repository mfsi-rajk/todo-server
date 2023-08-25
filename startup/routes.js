const express = require('express');
const cors = require('cors');
const error = require('../middlewares/error');
const api = require('../routes/index.route');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(bodyParser.json({ type: 'application/*+json' }));
  app.use(error);
  app.use(cookieParser());
  app.use('/api', api);
};
