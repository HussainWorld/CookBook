
# CookBook Website

![CookBook Logo](public/images/HomePage.png)

## Description

CookBook is a responsive website designed for sharing recipes, cooking tips, and culinary inspiration. The project includes a visually appealing design, interactive elements, and is structured to provide an excellent user experience.

---

## Project Structure

```
COOKBOOK/
├── config/
│   └── database.js
├── controllers/
│   ├── auth.js
│   └── recipes.js
├── middleware/
│   ├── is-signed-in.js
│   └── pass-user-to-view.js
├── models/
│   └── user.js
├── node_modules
├── public/
│   ├── images/
│   │    ├── logo.png    # Website logo
│   │    └── banner.jpg  # Homepage banner
│   └── stylesheets/
│       ├── add-edit-recipe.css
│       ├── recipes.css
│       ├── show-recipe.css
│       ├── show.css
│       ├── signin-signup.css
│       └── style.css    # Contains the main
├── views/
│   ├── auth/
│   │   ├── sign-in.ejs
│   │   ├── sign-up.ejs
│   │   └── signin-signup.ejs
│   ├── partials/
│   │   ├── _footer.ejs
│   │   └── _navbar.ejs
│   ├── recipes/
│   │   ├── allRecipes.ejs
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── myRecipes.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   │
│   └── index.html # Main HTML file (Homepage)
│   
├── .env # Environment variables file (e.g., API keys, database URI)
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

---

## Features
- **Adding Recipes:** Users can add there own recipes to the database.
- **Edit Your Recipes:** Users can edit there old recipes that they shared.
- **Signin and SignUp:** Signin and Signout functionality.
- **Encrypted User Passwords:** Users passwords are encrypted in the database so no one will know the users passwords.
- **Clean and Organized Code:** Follows best practices for web development.

---

## Technologies Used

- **HTML5**: Structure of the website
- **CSS3**: Styling and layout
- **JavaScript**: Interactivity and dynamic features
- **Express.js**: A fast, minimalist web framework for Node.js used to build the server-side of the application, handle routing, and manage HTTP requests and responses efficiently.
- **EJS (Embedded JavaScript)**: A templating engine used to render dynamic content on the client-side. It allows embedding JavaScript logic into HTML templates to create reusable components and dynamic pages efficiently.
- **Morgan**: A HTTP request logger middleware for Node.js used to log details of incoming requests, which helps in monitoring and debugging server activity.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward way to interact with MongoDB by defining schemas, models, and performing CRUD operations on the database with an easy-to-use API, ensuring data consistency and validation.

---

## How to Run the Project

1. Download or clone this repository:
   ```bash
   git clone https://github.com/HussainWorld/CookBook.git
   ```

2. Open the project folder:
   ```bash
   cd CookBook
   ```

3. Run the following command in the terminal to install the required dependencies:
   ```bash
   npm install
   ```

4. To run the project in development mode, execute:
   ```bash
   npm run dev
   ```

5. Open your browser and go to http://localhost:3000 to view the application..

---

## License

This project is open source and available for anyone to use, modify, and distribute the code.

---

## Contact

For questions or feedback, feel free to reach out.

Email: hussain.nader.it@gmail.com

Happy Cooking! 🍳
