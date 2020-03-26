const express = require("express");
const jwt = require("jsonwebtoken");
const httpStatusCode = require("http-status-codes");

const authClientToken = async (req, res, next) => {
    let token = req.header["x-access-token"];

    if(!token) return res.status(httpStatusCode.UNAUTHORIZED).json({
        "error": [{
            msg: "no token provided"
        }]
    })

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.status(httpStatusCode.UNAUTHORIZED).json({
            "error": [{
                msg: "invalid token",
                err
            }]
        })
    })

    next();

}

module.exports = {
    authClientToken
}