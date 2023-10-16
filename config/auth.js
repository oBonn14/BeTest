const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'Token is missing' });
  }

  if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }

  const tokenValue = token.replace('Bearer ', '');

  jwt.verify(tokenValue, '4@re##', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ msg: 'You need to log-in first' });
    }
    next();
  });
};

module.exports = requireAuth;
