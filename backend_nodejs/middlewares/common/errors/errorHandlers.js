const createError = require('http-errors');

// 404 not found handler
const notFoundHandler = (err, req, res, next) => {
  next(createError(404, 'Not Found'));
};

//default error handler
const errorHandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === 'development' ? err : { error: err.message };
  res.status(err.status || 500);
  //json response
  res.json(res.locals.error);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
