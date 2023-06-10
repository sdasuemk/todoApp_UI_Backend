const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const User = require('../../schemas/models/User');

const signupValidation = [
  check('name')
    .isLength({ min: 1, max: undefined })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other than alphabet')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError('Email already is use!');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check('mobile')
    .isMobilePhone('IN')
    .withMessage('Mobile number must be a valid Indian mobile number')
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError('Mobile already is use!');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check('userName')
    .notEmpty()
    .withMessage('User name is required')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ userName: value });
        if (user) {
          throw createError('username already is use!');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
    ),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(422).json({
      errors: mappedErrors,
    });
    //next(mappedErrors);
  }
};

module.exports = { signupValidation, addUserValidationHandler };
