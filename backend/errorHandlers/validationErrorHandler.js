var { ValidationError } = require("express-json-validator-middleware");

module.exports = function(err, req, res, next) {
  if (err instanceof ValidationError) {
    // At this point you can execute your error handling code
    let errorMsg = "";
    if (err.validationErrors.query && err.validationErrors.query.length)
      errorMsg = `Bad request, ${err.validationErrors.query[0].message}`;

    if (err.validationErrors.body && err.validationErrors.body.length)
      errorMsg = `Bad request, ${err.validationErrors.body[0].message}`;

    res.status(400).send(errorMsg);
    next();
  } else next(err); // pass error on if not a validation error
};
