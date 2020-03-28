const express = require("express");
const creditModel = require("../../../models/credit");
const httpStatusCode = require("http-status-codes");
const chalk = require("chalk");

const { validationResult } = require("express-validator");

const saveCreditTransaction = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
      errors: [
        {
          errors: errors.array()
        }
      ]
    });

  let { user_id, amount, description, comment, can_edit } = req.body;

  try {
    let saved = await creditModel.create({
      user_id,
      amount,
      description,
      comment,
      can_edit
    });

    if (!saved) throw new error();

    return res.status(httpStatusCode.CREATED).json({
      success: [
        {
          msg: "transaction saved"
        }
      ]
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: [
        {
          msg: "there was a problem saving transaction"
        }
      ]
    });
  }
};

module.exports = {
  saveCreditTransaction
};
