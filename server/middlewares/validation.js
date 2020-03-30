const { check } = require("express-validator");

const fs = require("fs");
const path = require("path");

const ObjCurrency = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "../../currency.json")}`)
);

let currency = [];

for (const c in ObjCurrency) {
  currency.push(c);
}

const validateRegistrationBody = () => {
  return [
    check("name")
      .exists()
      .withMessage("name is required")
      .isLength({
        min: 3
      })
      .withMessage("name must be greater that 3 letters"),
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid"),
    check("password")
      .exists()
      .withMessage("password is required")
      .isLength({
        min: 8,
        max: 18
      })
      .withMessage("password must be in between 8 to 12 characters long"),
    check("currency")
      .exists()
      .withMessage("currency is required")
      .isLength({
        min: 3,
        max: 3
      })
      .withMessage("currency must be 3 letters long")
    // TODO Verify currency
  ];
};

const validateLoginBody = () => {
  return [
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid"),
    check("password")
      .exists()
      .withMessage("password is required")
      .isLength({
        min: 8,
        max: 18
      })
      .withMessage("invalid email/password")
  ];
};

const validateTransactions = () => {
  return [
    check("user_id")
      .exists()
      .withMessage("user id is required"),
    check("amount")
      .exists()
      .withMessage("amount is required")
      .isInt("invalid amount"),
    check("description")
      .exists()
      .withMessage("description is required")
      .isLength({
        min: 12
      })
      .withMessage("descriptions should be more that 12 letters"),
    check("can_edit")
      .exists()
      .withMessage("can edit is required")
  ];
};

const validateUpdateDetails = () => {
  return [
    check("name")
      .exists()
      .withMessage("name is required")
      .isLength({
        min: 3
      })
      .withMessage("name must be greater that 3 letters"),
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid"),
    check("password")
      .exists()
      .withMessage("password is required")
      .isLength({
        min: 8,
        max: 18
      })
      .withMessage("password must be in between 8 to 12 characters long"),
    check("currency")
      .exists()
      .withMessage("currency is required")
      .isLength({
        min: 3,
        max: 3
      })
      .withMessage("currency must be 3 letters long")
    // TODO Verify currency
  ];
};

module.exports = {
  validateLoginBody,
  validateRegistrationBody,
  validateTransactions,
  validateUpdateDetails
};
