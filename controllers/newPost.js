module.exports = (req, res) => {
  // if a userid exist in the session show the create post page
  // if not return the user to the login page
  if (req.session.userId) {
    return res.render("create");
  }
  res.redirect("/auth/login");
};
