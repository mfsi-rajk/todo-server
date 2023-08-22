const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DataBase...");
    })
    .catch(() => {
      console.log("Failed to connect to DataBase");
    });
};
