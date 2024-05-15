const errorHandler = (error, _request, response, next) => {
  if (error.message === "jwt must be provided") {
    return response
      .status(403)
      .json({ error: "jwt token missing or not provided" });
  } else if (error) {
    return response.status(403).json({ error: error.message });
  }

  next();
};

module.exports = errorHandler;
