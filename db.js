// Import mongoose ODM
const mongoose = require("mongoose")
// Import path to your database service
const DB_URL = process.env.DB_URL

const dbConnect = async () => {
    try {
        // Establishing a setting before connection
        mongoose.set("strictQuery", true)
        // Connect to the database service
        await mongoose.connect(DB_URL)
        console.log(`[db] connected to: ${DB_URL}`)
    } catch (err) {
        console.log(`[db] error: ${err}`)
    }
}

module.exports = { dbConnect, mongoose }