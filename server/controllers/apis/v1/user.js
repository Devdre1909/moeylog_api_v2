const express = require("express");
const router = express.Router();

const userService = require("../../../services/v1/user/user");
const authClientRequest = require("../../../middlewares/authguard");

router.get(
  "/:userId",
  authClientRequest.authClientToken,
  userService.getUserDetails
);

module.exports = router;
