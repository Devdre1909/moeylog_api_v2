const express = require("express");
const router = express.Router();

const userService = require("../../../services/v1/user/user");
const authClientRequest = require("../../../middlewares/authguard");
const validator = require("../../../middlewares/validation");

router.get(
  "/:userId",
  authClientRequest.authClientToken,
  userService.getUserDetails
);
router.put(
  "/:userId",
  authClientRequest.authClientToken,
  validator.validateUpdateDetails(),
  userService.updateUserDetails
);

module.exports = router;
