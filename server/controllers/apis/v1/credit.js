const express = require("express");
let router = express.Router();

const creditService = require("../../../services/v1/credit/credit");
const validation = require("../../../middlewares/validation");
const authClientRequest = require("../../../middlewares/authguard");

router.post(
  "/credit/add",
  authClientRequest.authClientToken,
  validation.validateTransactions(),
  creditService.saveCreditTransaction()
);

module.exports = router;
