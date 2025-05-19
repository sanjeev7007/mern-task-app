const jwt = require('jsonwebtoken');  // JWT library to verify tokens

module.exports = (req, res, next) => {
  // Get Authorization header from incoming request
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No auth header or wrong format');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract the token part from header ("Bearer <token>")
  const token = authHeader.split(' ')[1];

  try {
    // Verify token using secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    // Attach decoded payload (usually user info) to request object
    req.user = decoded;

    // Proceed to next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails (expired/invalid), respond with 401
    console.log('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
