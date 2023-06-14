const User = require("./../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

// REGSITER API

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user with the provided email already exists
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    // Generate token using the JWT_SECRET from .env
    const token = user.getSignedJwtToken();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
};

// LOGIN API

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check if user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Generate JWT token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      username: user.username, // Include the username in the response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// API TO SAVE THE CREDENTIALS

exports.saveCredential = async (req, res, next) => {
  try {
    const { username, email, provider } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      user.provider = provider;
    } else {
      user = new User({ username, email, provider });
    }
    await user.save();
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      username,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// FORGET PASSWORD API

exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

// RESET PASSWORD API

exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();

  res.status(statusCode).json({
    success: true,
    token,
  });
};
