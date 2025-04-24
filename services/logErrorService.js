const { read, save } = require("../helpers/rw")

const logError = (err, path) => {
    let currentDateTime = new Date()
    let errFile = read(path)
    errFile.push(`${currentDateTime} - ${err.message}`)
    save(errFile, path)
}

module.exports = logError