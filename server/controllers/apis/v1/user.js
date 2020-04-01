const express = require("express");
const router = express.Router();

const userService = require("../../../services/v1/user/user");
const authClientRequest = require("../../../middlewares/authguard");
const validator = require("../../../middlewares/validation");

router.get(
  "/me/:userId",
  authClientRequest.authClientToken,
  userService.getUserDetails
);
router.put(
  "/updatedetail/:userId",
  authClientRequest.authClientToken,
  validator.validateUpdateDetails(),
  userService.updateUserDetails
);
router.put(
  "/updatepassword/:userId",
  authClientRequest.authClientToken,
  validator.validateUpdatePassword(),
  userService.updateUserPassword
);
router.delete(
  "/delete/:userId",
  authClientRequest.authClientToken,
  userService.updateUserPassword
);

module.exports = router;
