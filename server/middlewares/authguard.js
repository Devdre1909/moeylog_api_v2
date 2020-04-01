const express = require("express");
const jwt = require("jsonwebtoken");
const httpStatusCode = require("http-status-codes");

const authClientToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res.status(httpStatusCode.UNAUTHORIZED).json({
      error: [
        {
          msg: "no token provided"
        }
      ]
    });

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          error: [
            {
              msg: "invalid token",
              err,
              decoded
            }
          ]
        });
    });
  } catch (err) {
    return res.status(httpStatusCode.UNAUTHORIZED).json({
      error: [
        {
          msg: "an error occurred",
          err
        }
      ]
    });
  }

  next();
};

module.exports = {
  authClientToken
};
