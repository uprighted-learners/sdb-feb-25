const fs = require("fs")

// Reading Data
function read(path) {
    const file = fs.readFileSync(path)
    return !file.length ? [] : JSON.parse(file)
}
// Saving Data
function save(data, path) {
    fs.writeFile(path, JSON.stringify(data), err => {
        if (err) console.log(err)
    })
}

module.exports = { read, save }