const router = require("express").Router()
const { read, save } = require("../helpers/rw")
const logError = require("../services/logErrorService")
const todoData = "./models/todos.json"
const todoLogs = "./logs/todoLogs.json"

router.get("/", (req, res) => {
    try {
        const db = read(todoData)

        if (!db.length) {
            throw new Error(`No data`)
        }
        
        res.status(200).json(db)
        
    } catch(err) {
        logError(err, todoLogs)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.get("/:searchValue", (req, res) => {
    try {
        const { searchValue } = req.params
        const db = read(todoData)
        
        const foundItem = db.filter(i => i.title === searchValue)
        
        if (!foundItem.length) {
            throw new Error(`No matches found`)
        }

        res.status(200).json(foundItem)
        
    } catch(err) {
        logError(err, todoLogs)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.post("/add", (req, res) => {
    try {
        const { title, urgency } = req.body

        if (!title || !urgency) {
            throw new Error(`please provide title and urgency`)
        }

        const IUrgency = ["low", "medium", "high"]

        if (!IUrgency.includes(urgency)) {
            throw new Error(`urgency options available ${IUrgency}`)
        }

        const db = read(todoData)

        db.push({ title, urgency})

        save(db, todoData)

        res.status(200).json({
            message: `${title} added`
        })

    } catch(err) {
        logError(err, todoLogs)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.put("/:searchValue", (req, res) => {
    // grab the searchValue from the param
    // extrapolate the new title from the body
    // read the db
    // check if the param value matches property value in the db
    // if it does, replace the value with the new value
    // if it doesn't send response that it doesn't match
})

router.delete("/:name", (req, res) => {
    // think in inverse of what you want to do
})


module.exports = router