const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config");

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });

      if (user) {
        const token = jwt.sign({ username: user.username }, config.secret, {
          expiresIn: "1h",
        });
        req.session.token = token;
        res.redirect("/students");
      } else {
        res.redirect("/auth/login");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password });
      await user.save();
      res.redirect("/auth/login");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/auth/login");
  },
};
