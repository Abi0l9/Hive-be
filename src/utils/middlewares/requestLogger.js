const requestLogger = (req, response, next) => {
  console.log(req.method, " ", req.path);
  console.log(req.body, " ");

  next();
};

module.exports = requestLogger;
