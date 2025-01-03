# Simple Crud App Building

### Technologies We're Practicing With:

- [Express (Node.js)](https://expressjs.com/) - Our backend framework for the server, routers, middleware design pattern.
- [MongoDB](https://www.mongodb.com/) - We'll be using MongoDB Atlas as our cloud database for storing and managing data.
- [Mongoose](https://mongoosejs.com/) - To populate our own data and building queries using its schema-based model structure.
- [Vanilla JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - We'll be using vanilla JS to set up our frontend using DOM manipulation.

# Instructions

#### (Updated `January 3, 2025`)

You can fork this repository and play around with this on your own!

### The git stuff

- Once you have it open, please create your own branch using `git checkout -b <insert branch name>`.
- From there, you will have the same copy of the files on your own new branch.
- To ensure it's backed up, please push your new branch onto the repo: `git push origin <your branch>`.
- You're doing this because it's good to practice creating and managing branches.
- To switch back to `main` branch, just simply do `git checkout main`.
- If you have already forked this repository, Feel free to work on `main` branch if you like! Or to avoid any merge conflicts should you want to pull any future updates from here, you can always work on a different branch.
- (Optional) If you want to delete your second branch to work on `main` instead, you can do `git branch -D <your branch name>`.

### Node dependencies

- By reading this next step, you are now in your own branch and ready to dive in. You will notice the `package.json` is already provided. It seems there might be already dependencies included. **What do you need to do to make sure you also have these dependencies installed**?
- Once you have the packages installed, feel free to explore the rest of the files!

### File Structure Map

This is how I have set up the file structure. This gives more opportunity to add more controller and routes in the future if I want to add more controllers, routes and/or even create another database! :)

But for making a simple CRUD app using a single database model and router file, adding other extra folders is not necessary!

<pre>
root
├── public/
│   └── index.html
│   └── requests.js
│   └── index.js
├── server/
│   ├── controllers/
│   │   └── controller.js
│   ├── models/
│   │   └── model.js
│   ├── routes/
│   │   └── routes.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
</pre>

#### The CRUD stuff

- The goal is make a simple CRUD app if your own design. It can be about anything. I already set up some boilerplate for you, and you're welcome to change or add more to your liking.
- The files are also placed for you based on my preference.
- This setup is utilizing **mongoDB** and **mongoose** for the backend server and database to manage data with since it's easier to learn.
- You will definitely need to use your own connection string from your [MongoDB Atlas](https://account.mongodb.com/account/login) cluster since we'll be utilizing the cloud database to manage our data.
- A bunch of pseudocode has been added on the files in this repo for you to read more about what each part of the code does. I hope I did my best to add some detailed explanations to help further understand when setting up the backend as well as working on DOM manipulation.
- Good luck :D

#### Other Notes

- Don't forget to create your own `.env` file! It has already been added to `.gitignore` list. You can simply create it at the root of your app using `touch .env` on your terminal.
- The `.env.example` has already been provided, which just shows the variables you can place it onto your own `.env` file, including your MongoDB connection string. Assuming you have a database created for this practice, you can refer the specific database onto your connection string.
- Disclaimer: This is just how I would personally set up my own CRUD app! Please send feedback me if you have questions!
