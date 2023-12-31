const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const verifyAuth = function(req, res, next) {
  const token = 
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized: Please Login to continue.');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Please Login to continue.');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = verifyAuth;