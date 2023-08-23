const express = require("express");
const router = express.Router();

const userRoutes = require("./user.route");
const todoRoutes = require("./todo.route");

router.get("/", (req, res) => {
    res.json({
      message: "API Running.",
    });
  });
router.use("/users", userRoutes);
router.use("/todos", todoRoutes);


module.exports = router;