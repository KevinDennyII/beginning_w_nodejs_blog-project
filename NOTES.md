# The Most Popular Reason for Using NodeJS

NodeJS's ability to both executed and develop on the server-side and client side is the most-widely spread reason by using NodeJS

# EJS

Embedded JavaScript(.ejs) allowing the redering of HTML output which encourages the reuse of code snippets to decrease replication within an application. This is using a templating engine which allows for abstractions of the app into different layouts.

# Callback Hell

This is considered "callback hell" bcause of the nested callbacks
and not good for scalability as your app grows more complext

        app.post("/posts/store", (req, res) => {
        // model creates a new doc with browser data
          BlogPost.create(req.body, (error, blogpost) => {
          res.redirect("/");
          });
        })

# MongoDB

NoSQL. Mongoose is an npm library officially supported by NodeJS to allows MongoDB to talk with NodeJS

# Chapter 7 addtional check?

Code for checking for null image also

        app.post("/posts/store", async (req, res) => {
          if (!!req.files) {
            let image = req.files.image;
            image.mv(
              path.resolve(__dirname, "public/img", image.name),
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
        });
