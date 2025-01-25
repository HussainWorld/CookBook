// controllers/recipes.js

const express = require('express');
// const router = express.Router();
const router = express.Router({ mergeParams: true });

const User = require('../models/user.js');


router.get('/', async (req, res) => {
  try {
    // find the user
    const currentUser = await User.findById(req.session.user._id);
    res.render('recipes/index.ejs', {
      recipes: currentUser.recipes
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/myRecipes', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    const recipes = currentUser.recipes 
    // Render index.ejs, passing in all of the current user's
    // applications as data in the context object.
    res.render('recipes/myRecipes.ejs', {
      user: req.session.user,
      recipes
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  res.render('recipes/new.ejs');
});


router.get('/:recipesId', async (req, res) => {
  try {
    // Look up the user from req.session
    const user = await User.findById(req.params.userId);
    // Find the recipe by the recipeId supplied from req.params
    const recipe = user.recipes.id(req.params.recipesId);
    // Render the show view, passing the recipe data in the context object
    res.render('recipes/show.ejs', {
      user: req.session.user,
      recipe: recipe, 
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);

    // Helper function to format the date
    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    // Get the current date and format it
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    // Add createdAt and updatedAt as formatted strings
    const newRecipe = {
      ...req.body,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };

    // Push the new recipe into the user's recipes array
    currentUser.recipes.push(newRecipe);

    // Save changes to the user
    await currentUser.save();

    // Redirect back to the user's recipes index view
    res.redirect(`/users/${currentUser._id}/recipes`);
  } catch (error) {
    // Log any errors and redirect back home
    console.log(error);
    res.redirect('/');
  }
});


router.delete('/:recipeId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // an application using the id supplied from req.params
    currentUser.recipes.id(req.params.recipeId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/recipes/myRecipes`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:recipeId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const recipe = currentUser.recipes.id(req.params.recipeId);
    res.render('recipes/edit.ejs', {
      recipe: recipe,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.put('/:recipeId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current application from the id supplied by req.params
    const recipe = currentUser.recipes.id(req.params.recipeId);
    // Use the Mongoose .set() method
    // this method updates the current application to reflect the new form
    // data on `req.body`
    recipe.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the show view of the current application
    res.redirect(
      `/users/${currentUser._id}/recipes/${req.params.recipeId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});




module.exports = router;
