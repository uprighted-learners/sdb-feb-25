require("dotenv").config()
const express = require("express")
const app = express()
// Import our database function I created
const { dbConnect } = require("./db")
const PORT = process.env.PORT

// Import the exported auth.js router object
const authRoute = require("./controllers/auth")
const todoRoute = require("./controllers/todos")
const sessionValidation = require("./middlewares/session")

// Middleware which allows us to point to where the route is
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(authRoute)
// request will go thru sessionValidation before going to todoRoute
app.use(sessionValidation, todoRoute)


/* 
    ? Model View Controller (MVC)
    *  architecture or system design style
    * breaks full stack application into:
        * model (data - ex: database)
        * view (client - ex: browser or Postman)
        * controller (logic - ex: endpoints)
    * we use MVC for Separation of Concerns
*/

app.listen(PORT, () => {
    // Invoke your database function
    dbConnect()
    console.log(`[server] listening on ${PORT}`)
})