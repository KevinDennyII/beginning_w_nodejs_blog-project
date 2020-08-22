const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = (req, res) => {
  // grab user name and password from request body
  var { username, password } = req.body;

  // find one user with the username, if user exist compare inputted password with password in mongo
  User.findOne({ username: username }, (error, user) => {
    if (user) {
      // we use .compare instead of === to prevent a hacker trick called timing attack
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // if passwords match, store user session
          // session package saves the data on the user's browswer each time a user makes a request
          req.session.userId = user._id;
          res.redirect("/");
        } else {
          res.redirect("/auth/login");
        }
      });
    } else {
      res.redirect("/auth/login");
    }
  });
};
