require("dotenv").config();
require('./config/database');
const express = require("express");


const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');

// require our new middleware!
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');


// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";


//Middleware

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView); // use new passUserToView middleware here

//Contollers
const authController = require('./controllers/auth');

const recipesController = require('./controllers/recipes.js');


//Public Routes
app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    // Redirect signed-in users to their applications index
    res.redirect(`/users/${req.session.user._id}/recipes`);
  } else {
    // Show the homepage for users who are not signed in
    res.render('index.ejs');
  }
});



app.use("/auth", authController);

//Protected Routes
app.use(isSignedIn); // use new isSignedIn middleware here
app.use('/users/:userId/recipes', recipesController); // New!


app.listen(port, () => {let port;
if (process.env.PORT) {
  port = process.env.PORT;
} else {
  port = 3000;
}

  console.log(`The express app is ready on port ${port}!`);
});
