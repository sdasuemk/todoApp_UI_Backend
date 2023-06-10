const User = require('../schemas/models/User');
const bcrypt = require('bcrypt');

const doSignup = async (req, res, next) => {
  try {
    const hasedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      userName: req.body.userName,
      password: hasedPassword,
    });
    const result = await user.save();
    res.status(201).json(result);
    console.log('new user saved successfully');
  } catch (err) {
    console.error('Failed to create user:', err);
    res.status(500).send('Failed to create user');
  } finally {
    next();
  }
};

module.exports = doSignup;
