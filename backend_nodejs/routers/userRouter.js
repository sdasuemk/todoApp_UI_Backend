const express = require('express');
const doSignup = require('../middlewares/signup');
const doLogin = require('../middlewares/login');
/* const {
  signupValidation,
  addUserValidationHandler,
} = require('../middlewares/validators/signupValidatior');
const {
  loginValidation,
  loginValidationHandler,
} = require('../middlewares/validators/loginValidator'); */

const userRouter = express.Router();

//TODO: validators fixup required
// signup
userRouter.post(
  '/signup',
  /* signupValidation,
  addUserValidationHandler, */
  doSignup
);

// login

userRouter.post(
  '/login',
  /*  loginValidation, loginValidationHandler, */ doLogin
);

module.exports = userRouter;
