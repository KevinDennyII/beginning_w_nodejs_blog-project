const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// User Schema with validations provided by Mongoose
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/* Notice the call to next(). Calling this function invokes the next middleware function in the app. The next() function is not a part of the Node.js or Express API, but is the third argument that is passed to the middleware function. The next() function could be named anything, but by convention it is always named “next”. To avoid confusion, always use this convention.*/
// Before we save any record into the User schema, execute the function passed into the 2nd argument.  Here next is called so mongoose can continue created the user data
UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

// export model
const User = mongoose.model("User", UserSchema);
module.exports = User;
