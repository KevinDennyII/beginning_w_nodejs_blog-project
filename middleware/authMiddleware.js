const User = require("../models/User");

module.exports = (req, res, next) => {
  // check if the user is found or if use doesnt exists
  User.findById(req.session.userId, (error, user) => {
    // if user doesnt exist return to homepage
    if (error || !user) return res.redirect("/");

    next();
  });
};
