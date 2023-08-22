const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
      message: "API Running.",
    });
  });
// router.use("/todo", todoRoutes);


module.exports = router;