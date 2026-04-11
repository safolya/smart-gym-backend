module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.membership.role)) {
      return res.status(403).json({
        message: "Access Denied"
      });
    }
    next();
  };
};