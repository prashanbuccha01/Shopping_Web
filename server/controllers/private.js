exports.getPrivateRoute = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      username: req.user.username,
      email: req.user.email,
    },
  });
};
