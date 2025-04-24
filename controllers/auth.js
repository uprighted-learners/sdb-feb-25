// Imports Express Router
const router = require("express").Router();

const fs = require("fs");
const dbPath = "./models/users.json";
const logFilePath = "./logs/authLogs.json"
const logError = require("../services/logErrorService.js")
const { save, read } = require("../helpers/rw.js");

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
	const { fullName, email, password } = req.body;
	console.log(fullName, email, password);

	let userDB = read(dbPath);

	let foundUser = userDB.filter(usr => usr.email === email);

	if (foundUser.length) {
		res.status(409).json({
			message: "User already exists",
		});
	} else {
		userDB.push({
			fullName: fullName,
			email: email,
			password: password,
		});

		save(userDB, dbPath);
	}

	res.status(200).json({
		message: "Here's our response",
	});
});

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

router.post("/login", (req, res) => {
	// const { email, password } = req.body
	// const userDB = read(dbPath)
	// const foundUser = userDB.filter(usr => usr.email === email)

	// if (foundUser.length) {
	//     if (foundUser[0].password === password) {
	//         res.status(200).json({
	//             message: `Logged in as ${email}`
	//         })
	//     } else {
	//         res.status(403).json({
	//             message: "Forbidden"
	//         })
	//     }
	// } else {
	//     res.status(404).json({
	//         message: "User not found"
	//     })
	// }

	// Early Return Example

	// if (!foundUser.length) {
	//     res.status(404).json({
	//         message: "User not found"
	//     })
	//     return
	// }

	// if (foundUser[0].password !== password) {
	//     res.status(403).json({
	//         message: "Forbidden"
	//     })
	//     return
	// }

	// res.status(200).json({
	//     message: `${email} logged in`
	// })

    // Guard Clauses

    /* 
        ? Challenge
        * build me a function called logError
        * it will take an error
        * it will append said error to an error file
        ! SPICEY MODE ensure that the error is preceeded with a time stamp
        TODO: HINT use a pattern we've used for retrieving and saving users from our database
    */

    
	try {
		const { email, password } = req.body;
		const userDB = read(dbPath);
		const foundUser = userDB.filter(usr => usr.email === email);

		if (!foundUser.length) {
			throw new Error("User not found")
		}

		if (foundUser[0].password !== password) {
			throw new Error("Forbidden")
		}

		res.status(200).json({
			message: `${email} logged in`,
		});

	} catch (err) {
        logError(err, logFilePath)
        res.status(500).json({
            message: `${err.message}`
        })
    }
});

// Exports our router object into the Module
module.exports = router;
