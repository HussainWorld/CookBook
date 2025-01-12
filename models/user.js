const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  ingredient: 
    {
      type: String,
      require: false,
    },
  instructions: {
    type: String,
    require: false,
  },
  category: {
    type: String,
    require: true,
    enum: ['BreakFast', 'Lunch', 'Dinner', 'Snack', 'Desserts']
  },
  iamgeUrl: {
    type: String,
    require: false,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  updatedAt: {
    type: Date,
    require: true,
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
