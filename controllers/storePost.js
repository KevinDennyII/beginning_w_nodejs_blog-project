const BlogPost = require("../models/BlogPost.js");
const path = require("path");

// i.e req.body.title, req.body.body
// we await the current the completion of the current line before the below line can be executed
module.exports = async (req, res) => {
  if (!!req.files) {
    let image = req.files.image;
    image.mv(
      path.resolve(__dirname, "..", "public/img", image.name),
      async (error) => {
        // model creates a new doc with browser data
        await BlogPost.create({
          ...req.body,
          image: "/img/" + image.name,
        });
        res.redirect("/");
      }
    );
  } else {
    await BlogPost.create(req.body);
    res.redirect("/");
  }
};
