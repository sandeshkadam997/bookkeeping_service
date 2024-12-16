const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      // Check if the user's role is in the list of allowed roles
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied. You do not have access to this resource.' });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;
  