const express = require("express");
require('dotenv').config()

const app = express();

require("./startup/routes")(app);
require("./startup/db")();

const PORT = process.env.PORT;
const server = app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`Listening on port ${PORT}...`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
});
module.exports = server;
