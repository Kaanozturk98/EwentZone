/**
 * Auth Router path for backend.
 *
 */

const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/login", (req, res, next) => {
  let req_user = req.body;
  // Try to find user on database
  User.findOne({ email: req_user.email }, function (err, user) {
    if (err) return res.status(500).json({ errors: err });
    // If user can not be found, return a 404 saying that there isnt such a user
    if (!user) {
      throw new Error("Bu emaile sahip bir kullanıcı bulamadık.");
    }
    // If user is found, compare the password using UserSchema's method.
    if (user) {
      return (
        user
          .comparePassword(req_user.password)
          // If there is a match with the given password in the request
          .then((isMatch) => {
            if (isMatch) {
              // Return a token with JWT which will be set on every request authenticated by this user.
              // This will be used on Front-End side.
              let token = jwt.sign(
                {
                  userId: user._id,
                  email: user.email,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: "7 days",
                }
              );
              return res.status(200).json({
                message: `Başarıyla giriş yaptınız`,
                token,
                user,
              });
            } else {
              return res.status(401).json({
                message: "Şifreniz hatalı",
              });
            }
          })
          // Log any errors occured while comparing passwords.
          .catch((err) => {
            return res.status(500).json({ err });
          })
      );
    }
  });
});
/**
 * END Login Route
 */

/**
 * START Register Route
 */
router.post("/register", (req, res, next) => {
  const new_user = req.body;

  return new User(new_user)
    .save()
    .then((user) => {
      return res.status(200).json({
        message: `Başarıyla kayıt oldunuz, artık giriş yapabilirsiniz.`,
      });
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Bir hata oluştu.");
    });
});

/**
 * END Register Route
 */

/**
 * Start My Account Route
 */

router.get("/my_account", (req, res, next) => {
  const Authorization = req.headers["authorization"];

  if (!Authorization) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const accessToken = Authorization.split(" ")[1];
  const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  const pipeline = [
    {
      $match: {
        $expr: {
          $eq: ["$_id", mongoose.Types.ObjectId(userId)],
        },
      },
    },
  ];

  return User.aggregate(pipeline)
    .exec()
    .then((data) => {
      const user = data[0];
      res.status(200).json({ user });
    })
    .catch((error) => res.status(500).json({ error }));
});

/**
 * End My Account Route
 */

module.exports = router;
