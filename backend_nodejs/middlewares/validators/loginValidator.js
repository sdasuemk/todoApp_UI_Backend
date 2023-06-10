const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const User = require('../../schemas/models/User');

const loginValidation = [
  check('userName')
    .notEmpty()
    .withMessage('User name is required')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ userName: value });
        if (user) {
          // Ignore
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

const loginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(422).json({
      errors: mappedErrors,
    });
    next(mappedErrors);
  }
};

module.exports = { loginValidation, loginValidationHandler };
