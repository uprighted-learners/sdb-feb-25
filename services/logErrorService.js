const Log = require("../models/Log")

const logError = (err) => {
    const { name, message } = err
    const newErr = new Log({
        errorName: name,
        errorMessage: message
    })
    newErr.save()
}

module.exports = logError