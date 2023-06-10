const jwt = require('jsonwebtoken');

const authGuard = async (req, res, next) => {
  const { authorization } = req.headers; //get Bearer token from headers 'Bearer <token>'
  try {
    const token = authorization.split(' ')[1]; //remove Bearer ang get only token
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const { userName, userId } = decodedToken;
    req.userName = userName;
    req.userId = userId;
    return;
  } catch (err) {
    console.error(err);
    res.status(404).send('Authentication failed!');
  } finally {
    next();
  }
};
module.exports = authGuard;
