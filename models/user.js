const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredient: 
    {
      type: String,
      required: false,
    },
  instructions: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
    enum: ['BreakFast', 'Lunch', 'Dinner', 'Snack', 'Desserts']
  },
  imageUrl: {
    type: String,
    required: false,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  }
});

const categorySchema = new mongoose.Schema({

  category: {
    type: String,
    require: true,
    enum: ['Break Fast', 'Lunch', 'Dinner', 'Snack', 'Desserts']
  }, 
   recipeIds: [
    {
      type: String,
      required: true,
    },
  ],

});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: [recipeSchema], // embedding the recipeSchema here
});


const User = mongoose.model("User", userSchema);

module.exports = User;
