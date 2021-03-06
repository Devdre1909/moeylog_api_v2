const express = require("express");
let router = express.Router();

const userController = require("../../controllers/apis/v1/user");
const authController = require("../../controllers/apis/v1/auth");
//TODO route for debit and credit
//const debitController = require("../../controllers/apis/v1/debit");
const creditController = require("../../controllers/apis/v1/credit");

router.use("/user", userController);
router.use("/auth", authController);
router.use("/credit", creditController);
//router.use("/debit", debitController);

module.exports = router;
