const express = require('express');
const cors = require('cors');
const error = require('../middlewares/error');
const api = require('../routes/index.route');
const cookieParser = require('cookie-parser');

module.exports = function (app) {
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(error);
  app.use(cookieParser());
  app.use('/api', api);
};
