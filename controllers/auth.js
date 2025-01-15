const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");


// router.get('/sign-up', (req, res) => {
//   res.render('auth/sign-up.ejs');
// });

// router.get("/sign-in", (req, res) => {
//   res.render("auth/sign-in.ejs");
// });

router.get('/signin-signup', (req, res) => {
  res.render('auth/signin-signup.ejs');
});

router.post("/sign-in", async (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

    //see if the user already exists in the database
    const userInDatabase = await User.findOne({ username });
    if (!userInDatabase) {
      return res.send("Login failed. Please try again.");
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send("Login failed. Please try again.");
    }
    
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    res.redirect("/");

});

// Sign-out route
router.get("/sign-out", (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during session destruction:", err);
        return res.status(500).send("Unable to sign out. Please try again.");
      }
      // Redirect to the login page after signing out
      res.redirect("/");
    });
  } catch (error) {
    console.error("Error in signout:", error);
    res.status(500).send("Signout failed.");
  }
});

router.post("/sign-up", async (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const username = req.body.username;

  //Check if the password and confirm password match
  if (password !== confirmPassword) {
    return res.send("Passwords do not match.");
  }

  //see if the user already exists in the database
  const userInDatabase = await User.findOne({ username });

  if (userInDatabase) {
    return res.send("Username or Password is invalid.");
  }


  
  //Create a new registration


  // 1) encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // 2) replace the raw password with the encrypted password
  req.body.password = hashedPassword;


  // 3) save the user to the database
  const newUser = await User.create(req.body);

    // Automatically log the user in
    req.session.user = {
      username: newUser.username,
      _id: newUser._id,
    };

  // validation logic
  // res.send(newUser.username);
  res.redirect("/");

});


module.exports = router;
