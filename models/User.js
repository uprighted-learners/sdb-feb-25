const { mongoose } = require("../db")

/* 
    ? Schema
    * allows us to define the data structure for a particular collection
*/

const User = new mongoose.Schema(
    {
        fullName: {
            // Validators
            type: String,
            required: true,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

// ? Generate a collection by creating a MODEL (it takes name and schema as params)
module.exports = mongoose.model("user", User)