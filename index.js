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
const validateMiddleware = require("./middleware/validationMiddleware");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");

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

// Custom Middle Ware
const customMiddleware = (req, res, next) => {
  console.log("Custom middle ware called");
  next();
};
app.use(customMiddleware);
app.use("/posts/store", validateMiddleware);
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

const expressSession = require("express-session");
app.use(
  // creating for signature and encryption
  expressSession({
    secret: "keyboard cat",
  })
);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

// THIS MUST BE CALLED AFTER EXPRESS SESSION IS CREATED ABOVE
// global login to be used for the navigation bar
// we specificy the wildcard, "*", that on all requests,
// middleware should be executed
global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

// creating routes for pages
app.get("/", homeController);
app.get("/post/:id", getPostContstroller);
app.get("/posts/new", newPostController);
app.get("/auth/register", newUserController);
app.get("/auth/login", loginController);
// you must make to call authMiddleware BEFORE controller
app.get("/posts/new", authMiddleware, newPostController);
app.get("/post/store", authMiddleware, storePostController);
app.get(
  "/auth/register",
  redirectIfAuthenticatedMiddleware,
  newUserController
);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.get("auth/logout", logoutController);

// POST requests
app.post("/posts/store", storePostController);
app.post("/users/register", storeUserController);
app.post("/users/login", loginUserController);
app.post(
  "/user/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
