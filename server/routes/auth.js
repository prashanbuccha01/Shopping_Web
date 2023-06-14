const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  saveCredential,
} = require("./../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/savedata").post(saveCredential);

router.route("/forgetpassword").post(forgotPassword);

router.route("/resetpassword/:resetToken").put(resetPassword);

module.exports = router;
