var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "api is working" });
  res.end();
});

module.exports = router;
