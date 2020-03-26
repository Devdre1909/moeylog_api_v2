const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

let Schema = mongoose.Schema;

const ObjCurrency = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "../../currency.json")}`)
);
let currency = [];

for (const c in ObjCurrency) {
  currency.push(c.toLowerCase());
}

let User = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      lowercase: true
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, "password is required"]
    },
    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: {
        values: currency,
        message: "give access and turn on location/pick form the list"
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", User);
