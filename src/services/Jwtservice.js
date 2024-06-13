const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1h" }
  );
  return access_token;
};
const genneralRefreshToken = async (payload) => {

  const refresh_token = jwt.sign(
    {
      payload,
    },
    "refresh_token",
    { expiresIn: "365d" }
  );
  return access_token;
};
module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
};
