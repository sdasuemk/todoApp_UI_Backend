const User = require('../schemas/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const doLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    console.log(user);
    if (user) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        // generate token
        const token = jwt.sign(
          {
            userName: user.userName,
            userId: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({
          access_token: token,
          message: 'Login successful',
        });
        console.log('User found successfully');
        return;
      }
    }
    res.status(404).send('Authentication failed!');
    console.log('user not found');
  } catch (err) {
    console.error('Failed to login:', err);
    res.status(500).send('Failed to login');
  } finally {
    next();
  }
};

module.exports = doLogin;
