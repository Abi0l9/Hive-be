const jwt = require("jsonwebtoken");

const userExtractor = (request, _response, next) => {
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  request.user = decodedToken;

  next();
};

module.exports = userExtractor;
