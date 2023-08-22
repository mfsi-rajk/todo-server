const express = require("express");
const router = express.Router();

const userRoutes = require("./user.route");

router.get("/", (req, res) => {
    res.json({
      message: "API Running.",
    });
  });
router.use("/user", userRoutes);
// router.use("/todo", todoRoutes);


module.exports = router;