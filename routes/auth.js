var express = require("express");
var router = express.Router();
var controller = require("../controllers/users");

router.post("/auth/register", controller.insert_user);

module.exports = router;
