const express = require("express");
var cors = require("cors");
const ejs = require("ejs");
const { restart } = require("nodemon");

// Controllers
const homeController = require("./controllers/home");
const loginController = require("./controllers/login");
const newPostController = require("./controllers/newPost");
const storePostController = require("./controllers/storePost");
const getPostContstroller = require("./controllers/getPost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const validateMiddleWare = require("./middleware/validationMiddleware");
const loginUserController = require("./controllers/loginUser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
});

var app = new express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Create custom middle ware to be used
const customMiddleWare = (req, res, next) => {
  console.log("Custom middle ware called");
  next();
};
app.use(customMiddleWare);
app.use("/posts/store", validateMiddleWare);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

// creating routes for pages
app.get("/", homeController);
app.get("/post/:id", getPostContstroller);
app.get("/posts/new", newPostController);
app.get("/auth/register", newUserController);
app.get("/auth/login", loginController);

// POST requests
app.post("/posts/store", storePostController);
app.post("/users/register", storeUserController);
app.post("/users/login", loginUserController);
