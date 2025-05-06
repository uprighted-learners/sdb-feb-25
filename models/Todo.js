const { mongoose } = require("../db")

const Todo = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        urgency: {
            type: Number,
            min: 1,
            max: 3,
            required: true
        },
        completed: {
            type: Boolean
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("todo", Todo)
