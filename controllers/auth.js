// Imports Express Router
const router = require("express").Router();
const logError = require("../services/logErrorService.js")
// Bring your model into your business logic
const User = require("../models/User.js")

router.post("/register", async (req, res) => {

	try {
		const { fullName, email, password } = req.body;
		console.log(fullName, email, password);
		
		// ? Instantiate a new model using provided values
		const newUser = new User({ fullName, email, password })

		// Save the model document into the collection
		await newUser.save()

		res.status(201).json({
			message: `User created`,
			newUser
		})

	} catch(err) {
		console.log(err)
		logError(err)
		res.status(500).json({
			error: `${err}`
		})
	}
});

/* 
	? Challenge for Thursday
	* create a new schema called Log
	* figure out what data you're gonna collect
	* figure out what validators you want to use
	* export the model
	* import the model into logErrorService
	* clean up logErrorService of unnecessary code
	* adjust the logic so that our service saves the error to the logs collection instead of the file
	! Spicey Dilemma
	* do you think you still need to define the date?
	* if not, what can you use that already has a date in for you?
*/

router.post("/login", async (req, res) => {

	try {
		const { email, password } = req.body;

		// Retrieve all entries from the database which match our query
		let foundUser = await User.find({ email })
		
		// Check if .find method returns [] or array with object it found
		if (!foundUser.length) throw Error(`${email} not found`)
		
		// Compare password from the db to the one in the request and send error if it doesn't match
		if (foundUser[0].password !== password) throw Error(`invalid password`)

		res.status(200).json({ message: `${email} logged in` })
		
	} catch (err) {
        logError(err)
        res.status(500).json({
            message: `${err.message}`
        })
    }
});

// Exports our router object into the Module
module.exports = router;
