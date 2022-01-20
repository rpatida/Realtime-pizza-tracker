const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");

const authController = () => {
  const _getRedirectUrl = (req) => {
    return req.user.role === "admin" ? "/admin/orders" : "/customer/orders";
  };
  return {
    login(req, res) {
      res.render("auth/login");
    },
    postLogin(req, res, next) {
      const { email, password } = req.body;

      if (!email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/login");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }

          return res.redirect(_getRedirectUrl(req));
        });
      })(req, res, next);
    },
    register(req, res) {
      res.render("auth/register");
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;
      //Validate request parameters
      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      //Check email unique
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email already exists");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      //has password

      const haspassword = await bcrypt.hash(password, 10);

      //CReate user
      const user = new User({
        name,
        email,
        password: haspassword,
      });

      user
        .save()
        .then((user) => {
          //Login
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        });
    },
    logout(req, res) {
      req.logout();
      return res.redirect("/login");
    },
  };
};

module.exports = authController;
