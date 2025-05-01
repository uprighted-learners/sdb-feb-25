const router = require("express").Router()
const logError = require("../services/logErrorService")

router.get("/", (req, res) => {
    try {
        // TODO" create business logic to retrieve all todo's once you've completed POST logic and added a few
        
    } catch(err) {
        logError(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.get("/:searchValue", (req, res) => {
    try {
        const { searchValue } = req.params

        // TODO: spicey mode: try to build a logic where you pass searchValue as a query to your database to find specific todo item
        
    } catch(err) {
        logError(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.post("/add", (req, res) => {
    try {
        const { title, urgency } = req.body

        // TODO: create Todo model, and build logic to add todo to your collection

    } catch(err) {
        logError(err)
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