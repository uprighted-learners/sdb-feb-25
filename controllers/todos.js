const router = require("express").Router()
const logError = require("../services/logErrorService")
const Todo = require("../models/Todo")

router.get("/", async (req, res) => {
    try {
        const foundTodos = await Todo.find({})
        
        res.status(200).json(foundTodos)
        
    } catch(err) {
        logError(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.get("/:searchValue", async (req, res) => {
    try {
        const { searchValue } = req.params
        
        const found = await Todo.find({ title: searchValue })
        // ! Tip: if empty, find returns []; findOne returns null
        
        if (!found.length) throw new Error(`Nothing matching this query`)

        res.status(200).json(found)
        
    } catch(err) {
        console.log(err)
        logError(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.post("/add", async (req, res) => {
    try {
        const { title, urgency } = req.body

        const newEntry = new Todo({ title, urgency })
        await newEntry.save()

        res.status(201).json({
            message: `Entry created`,
            data: newEntry
        })

    } catch(err) {
        logError(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        // ? Nullish Coalescing Operator (??)
        // * returns the side which resolves to true
        // * ONLY treats null and undefined as "falsey", not false

        // reassign db values in our copy of the db by using the id from param
        const updated = await Todo.findByIdAndUpdate(id, {
            title: req.body.title ?? title,
            urgency: req.body.urgency ?? urgency,
            completed: req.body.completed ?? completed
        })

        if (!updated) throw new Error(`Entry under id not found`)

        res.status(200).json({
            message: `Success`,
            data: updated
        })
    
    } catch(err) {
        logError(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.delete("/:id", async (req, res) => {
    // think in inverse of what you want to do
    // ? Challenge
    // * find value by using the object id
    // * delete it from the database
    // * use the patterns we've already used
    
    try {
        const { id } = req.params

        const deleted = await Todo.findByIdAndDelete(id)
        console.log(deleted)

        if (!deleted) throw new Error(`Entry under id not found`)

        res.status(200).json({
            message: `Item deleted`,
            data: deleted
        })

    } catch(err) {
        logError(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})


module.exports = router