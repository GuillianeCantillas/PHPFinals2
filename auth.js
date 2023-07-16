const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    const userId = decoded.userId;

    User.findById(userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports.authenticateUser = authenticateUser;