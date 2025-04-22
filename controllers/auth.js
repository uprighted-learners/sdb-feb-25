// Imports Express Router
const router = require("express").Router()

const fs = require("fs")
const dbPath = "./models/users.json"
const { save, read } = require("../helpers/rw.js")


/* 
    ? CHALLENGE
    * we will have another controller that will need to save data (todolist controller)
    * create a helper folder
    * in it create a rw.js file
    * import the fs into your new rw.js file
    * move save and read functions in there
    * export them
    * import them into auth.js so they can continue to be used
*/


router.post("/register", (req, res) => {
    const { fullName, email, password } = req.body
    console.log(fullName, email, password)

    let userDB = read(dbPath)
    
    let foundUser = userDB.filter(usr => usr.email === email)

    if (foundUser.length) {
        res.status(409).json({
            message: "User already exists"
        })
    } else {
        userDB.push({
            fullName: fullName,
            email: email,
            password: password
        })
        
        save(userDB, dbPath)
    }

    res.status(200).json({
        message: "Here's our response"
    })
})

/* 
    ? Take Home Challenge
    * create a "/login" endpoint
    * login will be a POST endpoint as well
    * its body should handle email and password
    * check if the email is in your makeshift database
    * if it is
        * check if the password matches
        * if it does, send a 200 response and json object with message: "logged in"
        * if it does not, send a 403 with a message: "forbidden"
    * if it does not
        * send a 404 with a message "user not found"
    ! SPICEY MODE:
    * handle situation if the user did not provide email or password
    * make sure you greet logged in user by their email
*/

// Exports our router object into the Module
module.exports = router
