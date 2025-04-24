require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT

// Import the exported auth.js router object
const authRoute = require("./controllers/auth")

// Middleware which allows us to point to where the route is
app.use(express.json())
app.use(authRoute)

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
    console.log(`[server] listening on ${PORT}`)
})