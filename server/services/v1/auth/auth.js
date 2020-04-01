const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpStatusCodes = require("http-status-codes");
const chalk = require("chalk");

const { validationResult } = require("express-validator");

const userModel = require("../../../models/user");

// @desc      Register a new user
// @route     POST /api/v1/auth/register/
// @access    Public
const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: errors.array()
    });

  let { name, email, password, currency } = req.body;

  let isEmailExists = await userModel.findOne({
    email
  });

  if (isEmailExists)
    return res.status(httpStatusCodes.CONFLICT).json({
      errors: [
        {
          msg: "email already exists"
        }
      ]
    });

  let hashedPassword = await bcrypt.hash(password, 8);

  try {
    let user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      currency
    });

    if (!user) throw new error();

    return res.status(httpStatusCodes.CREATED).json({
      success: [
        {
          msg: "user registered successfully"
        }
      ]
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: [
        {
          msg: "there was a problem registering user"
        }
      ]
    });
  }
};

// @desc      Login a user
// @route     POST /api/v1/auth/login/
// @access    Public
const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
      error: [
        {
          errors: errors.array()
        }
      ]
    });

  let { email, password } = req.body;

  try {
    let isUserExist = await userModel.findOne({
      email
    });
    let isPasswordValid = await bcrypt.compare(password, isUserExist.password);

    if (!isUserExist || !isPasswordValid)
      return res.status(httpStatusCodes.UNAUTHORIZED).json({
        errors: [
          {
            msg: "invalid email/password"
          }
        ]
      });

    let token = jwt.sign(
      {
        id: isUserExist._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE
      }
    );

    res.status(httpStatusCodes.OK).json({
      success: [
        {
          msg: "user login successful",
          email,
          token
        }
      ]
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: [
        {
          msg: "there was a problem login user in",
          error
        }
      ]
    });
  }
};

module.exports = {
  register,
  login
};
