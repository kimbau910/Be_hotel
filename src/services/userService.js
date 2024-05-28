const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./Jwtservice");
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ok",
          message: "The message is already",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      console.log("hash", hash);
      const createUser = await User.create({
        name,
        email,
        password: hash,
        confirmPassword: hash,
        phone,
      });
      if (createUser) {
        resolve({
          status: "ok",
          message: "SUCCESS",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ok",
          message: "The user not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      console.log("comparePassword", comparePassword);
      if (!comparePassword) {
        resolve({
          status: "ok",
          message: "the password or user not incorrect",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      console.log("accesstoken", access_token);
      resolve({
        status: "ok",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ok",
          message: "The user not defined",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "ok",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ok",
          message: "The user not defined",
        });
      }
      // await User.findByIdAndDelete(id);
      resolve({
        status: "ok",
        message: "Delete SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
