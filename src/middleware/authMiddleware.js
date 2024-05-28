const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMiddleWare = (req, res) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(400).json({
        message: "the auth",
        status: "err",
      });
    }
    console.log("user", user);
  });
};

module.exports = {
  authMiddleWare,
};
