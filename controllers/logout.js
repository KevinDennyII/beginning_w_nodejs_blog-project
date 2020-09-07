module.exports = (req, res) => {
  // destroy all session when logging out
  req.session.destroy(() => {
    res.redirect("/");
  });
};
