module.exports.checkAuth = function (req, res, next) {
  const { userid: userId } = req.session;

  if (!userId) {
    res.redirect('/login');
  }

  next();
};
