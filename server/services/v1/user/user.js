const express = require('express');
const userModel = require('../../../models/user');
const httpStatusCode = require('http-status-codes');

const getUserDetails = async (req, res, next) => {
    let { userId } = req.params;
    let user = userModel.findById(userId).select('name, email, currency');
    if(!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
            "errors": [{
                "msg": "no user found"
            }]
        })
    }
    return res.status(httpStatusCode.OK).json({
        "success": [{
            "msg": "user fetch successful",
            user
        }]
    })
}

module.exports = {
    getUserDetails
}