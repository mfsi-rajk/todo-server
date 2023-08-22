const express = require("express");
const cors = require("cors");
const error = require("../middlewares/error");
const api = require("../routes/index.route");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(error);
  app.use("/api", api);
};
