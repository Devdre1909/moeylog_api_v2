const express = require("express");
const userModel = require("../../../models/user");
const httpStatusCodes = require("http-status-codes");
const bcrypt = require("bcryptjs");
const chalk = require("chalk");
const { validationResult } = require("express-validator");

// @desc      Get user details
// @route     GET /api/v1/user/me/:userId
// @access    Private
const getUserDetails = async (req, res, next) => {
  let { userId } = req.params;
  let user = await userModel.findById(userId).select("name currency email");
  if (!user) {
    return res.status(httpStatusCodes.NOT_FOUND).json({
      errors: [
        {
          msg: "no user found"
        }
      ]
    });
  }
  return res.status(httpStatusCodes.OK).json({
    success: [
      {
        msg: "user fetch successful",
        user
      }
    ]
  });
};

// @desc      Update user details
// @route     PUT /api/v1/user/updatedetails/:userId
// @access    Private
const updateUserDetails = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: errors.array()
    });

  let { userId } = req.params;
  let { name, email, currency, password } = req.body;

  let user = await userModel.findById(userId);

  if (!user)
    return res.status(httpStatusCodes.NOT_FOUND).json({
      error: [
        {
          msg: "no user found"
        }
      ]
    });

  presentEmail = await userModel.findById(userId).select("email");

  if (presentEmail.email != email) {
    isEmailExist = await userModel.findOne({ email });

    if (isEmailExist)
      return res.status(httpStatusCodes.CONFLICT).json({
        error: [
          {
            msg: "email exists"
          }
        ]
      });
  }

  try {
    user = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        currency
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) throw new Error();

    return res.status(httpStatusCodes.CREATED).json({
      success: [
        {
          msg: "user details updated",
          user
        }
      ]
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: [
        {
          msg: "there was a problem updating user details"
        }
      ]
    });
  }
};

// @desc      Update user password
// @route     PUT /api/v1/user/updatepassword/:userId
// @access    Private
const updateUserPassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: errors.array()
    });

  let { userId } = req.params;

  let user = userModel.findById(userId);

  if (!user)
    return res.status(httpStatusCodes.NOT_FOUND).json({
      error: [
        {
          msg: "no user found"
        }
      ]
    });

  let { password, confirmPassword } = req.body;

  if (password != confirmPassword)
    res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
      error: [
        {
          msg: "password must match confirm password"
        }
      ]
    });

  let hashedPassword = await bcrypt.hash(password, 8);

  try {
    user = await userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!user) throw new Error();

    return res.status(httpStatusCodes.CREATED).json({
      success: [
        {
          msg: "user details updated",
          user
        }
      ]
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: [
        {
          msg: "there was a problem updating user details"
        }
      ]
    });
  }
};

// @desc      Delete user password
// @route     DELETE /api/v1/user/delete/:userId
// @access    Private
const deleteUserAccount = async (req, res, next) => {
  let { userId } = req.params;

  let user = await userModel.findById(userId);

  if (!user)
    return res.status(httpStatusCodes.NOT_FOUND).json({
      error: [
        {
          msg: "no user found"
        }
      ]
    });

  try {
    user = await userModel.findByIdAndUpdate(userId, { deleted: true });
    if (!user) throw new Error();

    return res.status(httpStatusCodes.CREATED).json({
      success: [
        {
          msg: "user details updated",
          user
        }
      ]
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: [
        {
          msg: "there was a problem updating user details"
        }
      ]
    });
  }
};

module.exports = {
  getUserDetails,
  updateUserDetails,
  updateUserPassword,
  deleteUserAccount
};
