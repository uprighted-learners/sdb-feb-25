const jwt = require('jsonwebtoken')
const User = require("../models/User")
const JWT_KEY = process.env.JWT_KEY

const sessionValidation = async (req, res, next) => {
    try {
        // Preflight request -- verifies if endpoint accepts HTTP methods
        if (req.method === "OPTIONS") next()
        // Check if token has been provided
        if (!req.headers.authorization) throw new Error("Forbidden")
        // Sanitize token to account for itself or Bearer + token
        const authToken = req.headers.authorization.includes("Bearer")
            ? req.headers.authToken.split(" ")[1]
            : req.headers.authorization

        // Extricate the payload
        const payload = jwt.verify(authToken, JWT_KEY)

        // Add the user to the request
        req.user = payload._id
        
        next()
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
}

module.exports = sessionValidation